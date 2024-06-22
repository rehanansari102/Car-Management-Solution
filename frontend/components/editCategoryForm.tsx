// components/EditCategoryForm.tsx

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { TextField, Button, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { get,put } from '../utils/api';
interface IFormInput {
  name: string;
}

const EditCategoryForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>();
  const router = useRouter();
  const { category_id } = useParams();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await get(
          `/api/categories/${category_id}`);
        setValue("name", response.data.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategory();
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await put(`/api/categories/${category_id}`, data);
      router.push("/categories");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" gutterBottom>
        Edit Category
      </Typography>
      <TextField
        label="Category Name"
        {...register("name", { required: "Category name is required" })}
        InputLabelProps={{ shrink: true }}
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
