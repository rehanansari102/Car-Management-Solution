// app/categories/edit/[id].tsx
"use client"
import React from 'react';
import EditCategoryForm from '../../../../components/editCategoryForm';
import { Container } from '@mui/material';
import MainHeader from '@/components/header';
import withAuth from '@/utils/withAuth';

const EditCategoryPage: React.FC = () => {
  return (
    <Container>
        <MainHeader/>
      <EditCategoryForm />
    </Container>
  );
};

export default withAuth(EditCategoryPage);
