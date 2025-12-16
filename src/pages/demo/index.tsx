import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from '@mui/material';

import { GridColDef, GridPaginationModel, GridRowId } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import * as Yup from 'yup';
import toast from "react-hot-toast";
import TestList from './testList';
import { CreateTestDto, UpdateTestDto, TestDto } from '../../types/test';
import { FilmOptionType, FilterPagedResultRequestDto, ListResultDto, PagedResultDto } from '../../types/types';
import { del, get, post } from '../../request/axios/index'
import { Formik } from 'formik';
import AutoCheck from '../../components/AutoCheck';
import PageLoading from '../../components/PageLoading';
import OperateConfirmationDialog from '../../components/OperateConfirmationDialog';
import useDebounce from '../../hooks/useDebounce';
import PermissionControl from '../../components/PermissionControl';


const Demos: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentTest, setCurrentTest] = useState<UpdateTestDto | null>(null);
    const [searchText, setSearchText] = useState('');

    const searchQuery = useDebounce(searchText, 500); //use Debounce Hook
    useEffect(() => {
        setFilterPagedResultRequest((pre) => ({ ...pre, filter: searchQuery }));
    }, [searchQuery]);

    /**
     * open Dialog
     * @param test 
     */
    const handleOpenDialog = (test: UpdateTestDto | null) => {
        setCurrentTest(test);
        setOpenDialog(true);
    };

    /**
     * Close Dialog
     */
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCurrentTest(null);
    };


    /**
     * Save test (add or modify)
     * @param test 
     */
    const handleSaveTest = async (test: CreateTestDto | UpdateTestDto | null) => {
        if (test) {
            if (test.id > 0) {
                let resp = await post<boolean>("/test/Update", test)
                if (resp.isSuccess) {
                    toast.success("update success");
                    setFilterPagedResultRequest((pre) => ({ ...pre, page: 1 }))
                    handleCloseDialog();
                } else {
                    toast.error(resp.message);
                }

            } else {
                let resp = await post<boolean>("/test/Create", test)
                if (resp.isSuccess) {
                    toast.success("add success");
                    setFilterPagedResultRequest((pre) => ({ ...pre, page: 1 }))
                    handleCloseDialog();
                } else {
                    toast.error(resp.message);
                }

            }
        }
    }

    const [filterPagedResultRequest, setFilterPagedResultRequest] = useState<FilterPagedResultRequestDto>({ page: 1, pageSize: 10 });
    const [pageData, setPageData] = useState<PagedResultDto<TestDto>>({ items: [], total: 0 });
    const [roles, setRoles] = useState<FilmOptionType[]>([]);

    useEffect(() => {
        let getPageData = async () => {
            setLoading(true);
            try {
                let filterPagedResultRequestDto: FilterPagedResultRequestDto = {
                    ...filterPagedResultRequest,
                }
                let resp = await get<PagedResultDto<TestDto>>("/test/GetPage", filterPagedResultRequestDto);
                if (resp.isSuccess) {
                    setPageData(resp.data);
                }
            } finally {
                setLoading(false);
            }

        }
        getPageData();

    }, [filterPagedResultRequest])


    //Table Column Definition
    const columns: GridColDef[] = [
        // { field: 'id', headerName: 'ID', width: 90, },
        { field: 'title', headerName: 'title', width: 180 },
        { field: 'count', headerName: 'count', width: 220 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Box>
                        <IconButton onClick={() => handleUpdate(params.row as TestDto)}>
                            <EditIcon />
                        </IconButton>

                        <IconButton onClick={() => handleDelete(params.id)}>
                            <DeleteIcon />
                        </IconButton>

                </Box>
            ),
        },
    ];

    const handleUpdate = async (test: TestDto | null) => {
        let resp = await get<TestDto>(`test/Get/${test?.id}`);
        if (resp.isSuccess) {
            let testDetail = resp.data;
            let updateTestDto: UpdateTestDto = {
                id: testDetail.id,
                title: testDetail.title,
                count: testDetail.count
            }
            handleOpenDialog(updateTestDto)
        } else {
            toast.error(resp.message);
        }
    }

    const [comfirmDialogOpen, setComfirmDialogOpen] = useState(false);
    const [deData, setDelData] = useState(0);
    const handleDelete = async (id: GridRowId) => {
        setDelData(id as number);
        setComfirmDialogOpen(true);
    }

    const handleComfirmDelete = async () => {
        let resp = await del<boolean>(`test/delete/${deData}`);
        if (resp.isSuccess) {
            setFilterPagedResultRequest((pre) => ({ ...pre, page: 1 }));
            toast.success('delete success');
        } else {
            toast.error(resp.message);
        }
        setComfirmDialogOpen(false);
        console.log('handleComfirmDelete', deData);
    }

    const handleComfirmCancel = () => {
        setComfirmDialogOpen(false);
    }

    const onPaginationModelChange = (newModel: GridPaginationModel) => {
        setFilterPagedResultRequest(preState => {
            return {
                ...preState,
                page: newModel.page + 1,
                pageSize: newModel.pageSize
            }
        })
    }

    return (
        <Box sx={{ height: 500, width: '100%', p: 3 }} >
            {/* Load animation components */}
            <PageLoading
                loading={loading}
                size={50}
                color="primary"
                message="Loading test, please wait..."
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <TextField
                    variant="outlined"
                    placeholder="Search test..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    InputProps={{
                        startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
                    }}
                    sx={{ width: 300 }}
                />
               <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpenDialog(null)}
                    >
                        Add Test
                    </Button>
            </Box>
            <TestList
                columns={columns}
                pagedResult={pageData}
                page={(filterPagedResultRequest.page - 1)}
                onPaginationModelChange={onPaginationModelChange} />

            <TestDialog
                open={openDialog}
                onClose={handleCloseDialog}
                test={currentTest}
                onSave={handleSaveTest}
                //errors={errors}
                roles={roles}
            />

            <OperateConfirmationDialog
                open={comfirmDialogOpen}
                title="confirm delete"
                content="Are you sure you want to delete this item? This operation is irrevocable."
                onConfirm={handleComfirmDelete}
                onCancel={handleComfirmCancel}
            />
        </Box>

    );
};

//Test pop-up component Prop
interface TestDialogProps {
    open: boolean;
    roles: FilmOptionType[];
    onClose: () => void;
    test: UpdateTestDto | null;
    onSave: (test: CreateTestDto | UpdateTestDto | null) => void;
}



const TestDialog: React.FC<TestDialogProps> = ({ open, roles, onClose, test, onSave }) => {

    const isEdit = test != null;
    const validationSchema = Yup.object({
        title: Yup.string().required('title is required'),
        count: Yup.number().required('count is required').positive('count must be positive').integer('count must be an integer'),
    });

    const initialValues = {
        id: test ? test.id : 0,
        title: test ? test.title : '',
        count: test ? test.count : 0
    };
    const formikRef = useRef<any>(null); //  formikRef
    const handleSubmit = (values: (UpdateTestDto)) => {
        if (onSave) {
            if ('id' in values) {
                onSave(values);
            }
        }
        //console.log('Form values:', values);
    };


    const btnSave = () => {
        if (formikRef.current) {
            formikRef.current.submitForm(); //Manually trigger form submission
        }
    }

    //reason: DialogCloseReason
    const handleClose = (event: React.SyntheticEvent<{}>, reason: string) => {
        if (reason !== 'backdropClick') {
            onClose();
        }
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{test ? 'Edit Test' : 'Add Test'}</DialogTitle>
            <DialogContent>
                <Formik
                    innerRef={formikRef}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, handleBlur, setFieldValue, errors, touched }) => (
                        <form>
                            <TextField
                                name="title"
                                label="title"
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                error={touched.title && Boolean(errors.title)}
                                helperText={touched.title && errors.title}
                            />

                            <TextField
                                name="count"
                                label="count"
                                value={values.count}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                error={touched.count && Boolean(errors.count)}
                                helperText={touched.count && errors.count}
                            />
                        </form>
                    )}
                </Formik>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={btnSave} variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Demos;