import * as React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  console.log("Dashboard rendered - User Management version");

  return (
    <Box sx={{ flexGrow: 1, p: 5, textAlign: 'center', border: '10px solid red' }}>
      <Typography variant="h2" color="error" gutterBottom>
        USER MANAGEMENT DASHBOARD
      </Typography>
      <Button 
        variant="contained" 
        size="large" 
        onClick={() => navigate('/user-management')}
        sx={{ mt: 4, fontSize: '2rem' }}
      >
        GO TO USER MANAGEMENT
      </Button>
    </Box>
  );
};

export default Dashboard;
