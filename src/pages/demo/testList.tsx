import * as React from 'react';
import { DataGrid, GridColDef, GridPaginationModel, GridRowId } from '@mui/x-data-grid';
import { TestDto } from '../../types/test';
import { PagedResultDto } from '../../types/types';

interface TestListProps {
    page?: number;
    pageSize?: number;
    pageSizeOptions?: number[];
    pagedResult: PagedResultDto<TestDto>;
    columns: GridColDef[];
    onPaginationModelChange?: (newModel: GridPaginationModel) => void;


}

const TestList: React.FC<TestListProps> = (props) => {
    let pageSize = props.pageSize ?? 10; // default value
    let page = props.page ?? 0; // default value
    // const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
    //     page: page, 
    //     pageSize: pageSize,
    //   });
    let ageSizeOptions = props.pageSizeOptions ?? [10, 20, 50, 100]; // default value
    return (
        <DataGrid
            rows={props.pagedResult.items}
            rowCount={props.pagedResult.total}
            columns={props.columns}
            paginationModel={{ page: page, pageSize: pageSize }}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: pageSize,
                    },
                },
            }}
            paginationMode="server"
            pageSizeOptions={ageSizeOptions}
            onPaginationModelChange={(newModel) => {
                props.onPaginationModelChange && props.onPaginationModelChange(newModel)
            }
            }
            pagination
            disableRowSelectionOnClick
        />
    );
};

export default TestList;