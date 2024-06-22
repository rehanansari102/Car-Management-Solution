// components/CarList.tsx
"use client";
import React, { useEffect, useState } from "react";
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
import { get, del } from "../utils/api";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";

interface Car {
  id: string;
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

const CarList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [selectedCarId, setSelectedCarId] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories first
        const categoriesResponse = await get(`/api/categories`);
        const fetchedCategories = categoriesResponse.data;
        setCategories(fetchedCategories);

        // Fetch cars only after categories are fetched
        const carsResponse = await get(`/api/cars`);

        const modifiedData = carsResponse.data.map((car: any) => {
          const category = fetchedCategories.find(
            (cat: Category) => cat._id === car.categoryId
          );
          return {
            id: car._id,
            make: car.make,
            model: car.model,
            color: car.color,
            registrationNo: car.registrationNo,
            category: category ? category.name : "unknown",
          } as Car;
        });

        setCars(modifiedData);
        setLoading(false);
      } catch (error: any) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const handleDeleteDialogOpen = (id: string) => {
    setSelectedCarId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setSelectedCarId("");
    setDeleteDialogOpen(false);
  };

  const deleteCar = async (id: string) => {
    try {
      await del(`/api/cars/${id}`);
      setCars((prevCars) => prevCars.filter((car) => car.id !== id));
      handleDeleteDialogClose();
    } catch (error) {
      console.error(error);
    }
  };

  const columns: GridColDef[] = [
    { field: "make", headerName: "Make", width: 150 },
    { field: "model", headerName: "Model", width: 150 },
    { field: "color", headerName: "Color", width: 150 },
    { field: "registrationNo", headerName: "Registration No", width: 200 },
    { field: "category", headerName: "Category", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Button
            onClick={() => router.push(`/cars/edit/${params.id}`)}
            startIcon={<EditIcon />}
          ></Button>
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
        Cars List
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={cars}
          columns={columns}
          pagination
          sortingMode="server"
        />
      </div>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete Car</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this car?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => deleteCar(selectedCarId)} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CarList;
