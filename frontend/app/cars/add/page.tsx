// app/cars/add.tsx
"use client"
import React from 'react';
import AddCarForm from '../../../components/addCarForm';
import { Container } from '@mui/material';

const AddCarPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <AddCarForm />
    </Container>
  );
};

export default AddCarPage;
