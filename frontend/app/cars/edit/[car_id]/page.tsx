// app/cars/edit/[id].tsx
"use client";
import React from 'react';
import EditCarForm from '../../../../components/editCarForm';
import { Container } from '@mui/material';

const EditCarPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <EditCarForm />
    </Container>
  );
};

export default EditCarPage;
