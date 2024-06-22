import React from 'react';
import { Box, Button, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation'

const MainHeader: React.FC = () => {
  const history = useRouter();

  const goBack = () => {
    history.back();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth/signin";
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <Box display="flex" alignItems="center">
        <IconButton sx={{p:0}} onClick={goBack} className="back-icon" color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
      </Box>
      <Button onClick={logout} variant="contained" color="error">
        Logout
      </Button>
    </Box>
  );
};

export default MainHeader;
