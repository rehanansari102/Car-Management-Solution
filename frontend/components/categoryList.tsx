// components/CategoryList.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
}

const generateDummyCategories = (count: number): Category[] => {
  const categories = [];
  for (let i = 1; i <= count; i++) {
    categories.push({ id: `${i}`, name: `Category ${i}` });
  }
  return categories;
};

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await axios.get(`${baseUrl}/api/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error(error);
        // Use dummy data if API call fails
        setCategories(generateDummyCategories(20));
      }
    };

    fetchCategories();
  }, []);

  const handleDeleteDialogOpen = (id: string) => {
    setSelectedCategoryId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setSelectedCategoryId("");
    setDeleteDialogOpen(false);
  };

  const deleteCategory = async (id: string) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      await axios.delete(`${baseUrl}/api/categories/${id}`);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id)
      );
      handleDeleteDialogClose();
    } catch (error) {
      console.error(error);
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Button onClick={() => router.push(`/categories/edit/${params.id}`)}>
            Edit
          </Button>
          <IconButton
            color="secondary"
            onClick={() => handleDeleteDialogOpen(params.id as string)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Categories List
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 2,mb:3 }}
        color="primary"
        onClick={(e) => {
          router.push("categories/add");
        }}
      >
        Add Category
      </Button>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={categories} columns={columns} pagination />
      </div>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => deleteCategory(selectedCategoryId)}
            color="primary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CategoryList;
