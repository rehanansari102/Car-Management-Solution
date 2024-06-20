// components/AddCategoryForm.tsx

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { TextField, Button, Typography } from '@mui/material';

interface IFormInput {
  name: string;
}

const AddCategoryForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      await axios.post(`${baseUrl}/api/categories`, data);
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
