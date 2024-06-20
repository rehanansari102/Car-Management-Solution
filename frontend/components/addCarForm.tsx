// components/AddCarForm.tsx

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { TextField, Button, MenuItem, Typography } from '@mui/material';

interface IFormInput {
  category: string;
  color: string;
  model: string;
  make: string;
  registrationNo: string;
}

const categories = [
  'Bus',
  'Sedan',
  'SUV',
  'Hatchback'
];

const AddCarForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      await axios.post(`${baseUrl}/api/cars`, data);
      router.push('/cars');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" gutterBottom>
        Add New Car
      </Typography>
      <TextField
        label="Make"
        {...register('make', { required: 'Make is required' })}
        error={!!errors.make}
        helperText={errors.make?.message}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Model"
        {...register('model', { required: 'Model is required' })}
        error={!!errors.model}
        helperText={errors.model?.message}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Color"
        {...register('color', { required: 'Color is required' })}
        error={!!errors.color}
        helperText={errors.color?.message}
        fullWidth
        margin="normal"
      />
      <TextField
        select
        label="Category"
        {...register('category', { required: 'Category is required' })}
        error={!!errors.category}
        helperText={errors.category?.message}
        fullWidth
        margin="normal"
      >
        {categories.map(category => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Registration No"
        {...register('registrationNo', { required: 'Registration number is required' })}
        error={!!errors.registrationNo}
        helperText={errors.registrationNo?.message}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Add Car
      </Button>
    </form>
  );
};

export default AddCarForm;
