import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";

const CategoryPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardHeader
          avatar={<CategoryIcon color="primary" />}
          title="课程分类管理"
          subheader="占位 UI，后续接入真实接口与树形分类操作"
        />
        <Divider />
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="body1" color="text.secondary">
              在这里将提供分类的新增、编辑、启用/停用、排序、树形查看等功能。
              当前仅为占位界面，等待接入后端 API 与权限控制。
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button variant="contained" disabled>
                新建分类
              </Button>
              <Button variant="outlined" disabled>
                刷新
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CategoryPage;
