// components/EditCarForm.tsx

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useParams } from 'next/navigation';

interface IFormInput {
  make: string;
  model: string;
  color: string;
  registrationNo: string;
  category: string;
}

const EditCarForm: React.FC = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInput>();
  const router = useRouter();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await axios.get(`${baseUrl}/api/cars/${id}`);
        const car = response.data;
        setValue('make', car.make);
        setValue('model', car.model);
        setValue('color', car.color);
        setValue('registrationNo', car.registrationNo);
        setValue('category', car.category);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await axios.get(`${baseUrl}/api/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCar();
    fetchCategories();
  }, [id, setValue]);

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      await axios.put(`${baseUrl}/api/cars/${id}`, data);
      router.push('/cars');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" gutterBottom>
        Edit Car
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
        label="Registration No"
        {...register('registrationNo', { required: 'Registration No is required' })}
        error={!!errors.registrationNo}
        helperText={errors.registrationNo?.message}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          {...register('category', { required: 'Category is required' })}
          error={!!errors.category}
        >
          {categories.map((category: { _id: string, name: string }) => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Save Changes
      </Button>
    </form>
  );
};

export default EditCarForm;
