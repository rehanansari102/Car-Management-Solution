// app/categories/add.tsx
"use client"
import React from 'react';
import AddCategoryForm from '../../../components/addCategoryForm';
import { Container } from '@mui/material';

const AddCategoryPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <AddCategoryForm />
    </Container>
  );
};

export default AddCategoryPage;
