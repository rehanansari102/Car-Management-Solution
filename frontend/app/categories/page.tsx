// app/categories/index.tsx
"use client"
import React from 'react';
import CategoryList from '../../components/categoryList';
import { Container } from '@mui/material';
import MainHeader from '@/components/header';
import withAuth from '@/utils/withAuth';

const CategoryListPage: React.FC = () => {
  return (
    <Container maxWidth="lg"> 
      <MainHeader/>
      <CategoryList />
    </Container>
  );
};

export default withAuth(CategoryListPage);
