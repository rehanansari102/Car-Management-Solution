// components/AddCarForm.tsx

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { TextField, Button, MenuItem, Typography } from "@mui/material";
import { post,get } from '../utils/api';
interface IFormInput {
  categoryId: string;
  color: string;
  model: string;
  make: string;
  registrationNo: string;
}
interface Category {
  _id: string;
  name: string;
}

const AddCarForm: React.FC = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {       
        const categoriesdata = await get(`/api/categories`);
        setCategories(categoriesdata.data);
      } catch (error: any) {
        console.error(error);        
      }
    };

    fetchCategories();
    // fetchCar();
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {   
     
      await post(`/api/cars`, data);
      router.push("/cars");
    } catch (error: any) {
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
        {...register("make", { required: "Make is required" })}
        error={!!errors.make}
        helperText={errors.make?.message}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Model"
        {...register("model", { required: "Model is required" })}
        error={!!errors.model}
        helperText={errors.model?.message}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Color"
        {...register("color", { required: "Color is required" })}
        error={!!errors.color}
        helperText={errors.color?.message}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Registration No"
        {...register("registrationNo", {
          required: "Registration number is required",
        })}
        error={!!errors.registrationNo}
        helperText={errors.registrationNo?.message}
        fullWidth
        margin="normal"
      />
      <TextField
        select
        label="Category"
        {...register("categoryId", { required: "Category is required" })}
        error={!!errors.categoryId}
        helperText={errors.categoryId?.message}
        fullWidth
        margin="normal"
      >
        {categories.map((category: { _id: string; name: string }) => (
          <MenuItem key={category._id} value={category._id}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>

      <Button sx={{mt:2}} type="submit" variant="contained" color="primary">
        Add Car
      </Button>
    </form>
  );
};

export default AddCarForm;
