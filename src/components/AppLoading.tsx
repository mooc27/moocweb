

import React from 'react';
import { CircularProgress, Box, Backdrop } from '@mui/material';

interface PageLoadingProps {
    loading: boolean; // 控制是否显示加载动画
    size?: number; // 加载动画的大小
    color?: string; // 加载动画的颜色
    message?: string; // 加载时的提示信息
}

const AppLoading: React.FC<PageLoadingProps> = ({ loading, size = 40, color = 'primary', message }) => {
    if (!loading) return null; // 如果不显示加载动画，直接返回 null

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, position: 'absolute' }}
            open={loading} // 控制显示
        >
            <CircularProgress size={size} color={color as 'primary' | 'secondary' | 'inherit'} />
            {message && (
                <Box sx={{ mt: 2, color: 'text.secondary' }}>
                    {message}
                </Box>
            )}
        </Backdrop>

    );
};

export default AppLoading;