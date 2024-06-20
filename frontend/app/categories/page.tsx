// app/categories/index.tsx
"use client"
import React from 'react';
import CategoryList from '../../components/categoryList';
import { Container } from '@mui/material';

const CategoryListPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <CategoryList />
    </Container>
  );
};

export default CategoryListPage;
