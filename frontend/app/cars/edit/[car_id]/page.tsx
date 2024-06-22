// app/cars/edit/[id].tsx
"use client";
import React from 'react';
import EditCarForm from '../../../../components/editCarForm';
import { Container } from '@mui/material';
import MainHeader from '@/components/header';
import withAuth from '@/utils/withAuth';
const EditCarPage: React.FC = () => {
  return (
    <Container>
      <MainHeader/>
      <EditCarForm />
    </Container>
  );
};

export default withAuth(EditCarPage);
