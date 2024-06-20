// app/categories/edit/[id].tsx
"use client"
import React from 'react';
import EditCategoryForm from '../../../../components/editCategoryForm';
import { Container } from '@mui/material';

const EditCategoryPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <EditCategoryForm />
    </Container>
  );
};

export default EditCategoryPage;
