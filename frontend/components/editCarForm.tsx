// components/EditCarForm.tsx

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { get,put } from '../utils/api';
import {
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
interface IFormInput {
  make: string;
  model: string;
  color: string;
  registrationNo: string;
  category: string;
}
interface Category {
  _id: string;
  name: string;
}

const EditCarForm: React.FC = () => {  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>();
  const router = useRouter();
  const { car_id } = useParams();
  //console.log(id);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
       
        const categoriesdata = await get(`/api/categories`);
        setCategories(categoriesdata.data);          
        const response = await get(`/api/cars/${car_id}`);
        const car = response.data;
        setValue("make", car.make);
        setValue("model", car.model);
        setValue("color", car.color);
        setValue("registrationNo", car.registrationNo);
        setValue("category",car?.categoryid);     
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await put(`/api/cars/${car_id}`, data);
      router.push("/cars");
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" gutterBottom>
        Edit Car
      </Typography>
      <TextField
        label="Make"
        InputLabelProps={{ shrink: true }}
        {...register("make", { required: "Make is required" })}
        error={!!errors.make}
        helperText={errors.make?.message}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Model"
        InputLabelProps={{ shrink: true }}
        {...register("model", { required: "Model is required" })}
        error={!!errors.model}
        helperText={errors.model?.message}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Color"
        InputLabelProps={{ shrink: true }}
        {...register("color", { required: "Color is required" })}
        error={!!errors.color}
        helperText={errors.color?.message}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Registration No"
        InputLabelProps={{ shrink: true }}
        {...register("registrationNo", {
          required: "Registration No is required",
        })}
        error={!!errors.registrationNo}
        helperText={errors.registrationNo?.message}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          inputProps={{ shrink: true }}
          {...register("category", { required: "Category is required" })}
          error={!!errors.category}
          defaultValue={categories.length > 0 ? categories[0]._id : ''}
        >
          {categories.map((category: { _id: string; name: string }) => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button sx={{mt:2}} type="submit" variant="contained" color="primary">
        Save Changes
      </Button>
    </form>
  );
};

export default EditCarForm;
