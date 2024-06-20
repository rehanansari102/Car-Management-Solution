// components/EditCategoryForm.tsx

import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { TextField, Button, Typography } from '@mui/material';
import { useParams } from 'next/navigation';

interface IFormInput {
  name: string;
}

const EditCategoryForm: React.FC = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInput>();
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await axios.get(`${baseUrl}/api/categories/${id}`);
        setValue('name', response.data.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategory();
  }, [id, setValue]);

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      await axios.put(`${baseUrl}/api/categories/${id}`, data);
      router.push('/categories');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" gutterBottom>
        Edit Category
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
        Save Changes
      </Button>
    </form>
  );
};

export default EditCategoryForm;
