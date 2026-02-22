import * as React from 'react';
import { Box, Typography } from '@mui/material';

interface courseCategory {
  id: number;
  name: string;
  description: string;
  parentId: number | null;
  sortOrder: number;
  active: number;
  children: courseCategory[];
}

interface course {
  total: number;
  rows: {
    id: number;
    title: string;
    description: string;
    coverImage: string;
    categoryId: number;
    teacherId: number;
    status: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    category: {
      id: number;
      name: string;
    };
    teacher: {
      id: number;
      userName: string;
      email: string;
      avatar: string | null;
    };
  }[];
  page: number;
  pageSize: number;
}

const LandingPage: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Display System
      </Typography>
    </Box>
  );
};

export default LandingPage;
