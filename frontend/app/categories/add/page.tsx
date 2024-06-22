// app/categories/add.tsx
"use client"
import React from 'react';
import AddCategoryForm from '../../../components/addCategoryForm';
import { Container } from '@mui/material';
import MainHeader from '@/components/header';
import withAuth from '@/utils/withAuth';

const AddCategoryPage: React.FC = () => {
  return (
    <Container>
        <MainHeader/>
      <AddCategoryForm />
    </Container>
  );
};

export default withAuth(AddCategoryPage);
