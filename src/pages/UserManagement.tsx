import * as React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Avatar,
  Chip,
} from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { get } from "../request/axios/index";
import { ApiResponseResult, PagedResultDto } from "../types/types";

interface UserDto {
  id: number;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  gender: string;
  dob: string;
  avatar: string;
  bio: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

const UserManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PagedResultDto<UserDto>>({
    items: [],
    total: 0,
  });
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const fetchUsers = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const response: ApiResponseResult<PagedResultDto<UserDto>> = await get(
        "/user",
        {
          page: page + 1,
          pageSize: pageSize,
        }
      );
      if (response.isSuccess) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 80,
      renderCell: (params) => (
        <Avatar src={params.value} alt={params.row.userName} />
      ),
    },
    { field: "userName", headerName: "Username", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "firstName", headerName: "First Name", width: 130 },
    { field: "lastName", headerName: "Last Name", width: 130 },
    {
      field: "roles",
      headerName: "Roles",
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
          {params.value.map((role: string) => (
            <Chip key={role} label={role} size="small" />
          ))}
        </Box>
      ),
    },
    { field: "phone", headerName: "Phone", width: 130 },
    { field: "gender", headerName: "Gender", width: 100 },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        User Management
      </Typography>
      <Paper sx={{ height: 600, width: "100%", mt: 2 }}>
        <DataGrid
          rows={data.items}
          columns={columns}
          rowCount={data.total}
          loading={loading}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25]}
          sx={{ border: 0 }}
        />
      </Paper>
    </Box>
  );
};

export default UserManagement;
