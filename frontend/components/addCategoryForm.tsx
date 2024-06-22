// components/AddCategoryForm.tsx

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { TextField, Button, Typography } from '@mui/material';
import { post } from '../utils/api';
interface IFormInput {
  name: string;
}

const AddCategoryForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    try {   
      await post(`/api/categories`, data);
      router.push('/categories');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" gutterBottom>
        Add New Category
      </Typography>
      <TextField
        label="Category Name"
        {...register('name', { required: 'Category name is required' })}
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Add Category
      </Button>
    </form>
  );
};

export default AddCategoryForm;
