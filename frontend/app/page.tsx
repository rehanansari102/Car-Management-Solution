import React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Car Management
        </Typography>
        <Link href="/auth/signin" passHref>
          <Button color="inherit" className='text-white'>Sign In</Button>
        </Link>
        <Link href="/auth/signup" passHref>
          <Button color="inherit" className='text-white'>Sign Up</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
