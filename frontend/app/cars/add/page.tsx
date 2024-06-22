// app/cars/add.tsx
"use client"
import React from 'react';
import AddCarForm from '../../../components/addCarForm';
import { Container } from '@mui/material';
import MainHeader from '@/components/header';
import withAuth from '../../../utils/withAuth';

const AddCarPage: React.FC = () => {
  return (
    <Container>
        <MainHeader/>
      <AddCarForm />
    </Container>
  );
};

export default withAuth(AddCarPage);
