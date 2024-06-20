// components/CarList.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Car {
  id: string;
  make: string;
  model: string;
  color: string;
  registrationNo: string;
  category: string;
}

const generateDummyCars = (count: number): Car[] => {
  const cars = [];
  for (let i = 1; i <= count; i++) {
    cars.push({
      id: `${i}`,
      make: `Make ${i}`,
      model: `Model ${i}`,
      color: `Color ${i}`,
      registrationNo: `RegNo ${i}`,
      category: `Category ${i % 5}`,
    });
  }
  return cars;
};

const CarList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [selectedCarId, setSelectedCarId] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await axios.get(`${baseUrl}/api/cars`);
        setCars(response.data);
      } catch (error) {
        console.error(error);
        // Use dummy data if API call fails
        setCars(generateDummyCars(20));
      }
    };

    fetchCars();
  }, []);

  const handleDeleteDialogOpen = (id: string) => {
    setSelectedCarId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setSelectedCarId('');
    setDeleteDialogOpen(false);
  };

  const deleteCar = async (id: string) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      await axios.delete(`${baseUrl}/api/cars/${id}`);
      setCars(prevCars => prevCars.filter(car => car.id !== id));
      handleDeleteDialogClose();
    } catch (error) {
      console.error(error);
    }
  };

  const columns: GridColDef[] = [
    { field: 'make', headerName: 'Make', width: 150 },
    { field: 'model', headerName: 'Model', width: 150 },
    { field: 'color', headerName: 'Color', width: 150 },
    { field: 'registrationNo', headerName: 'Registration No', width: 200 },
    { field: 'category', headerName: 'Category', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Button onClick={() => router.push(`/cars/edit/${params.id}`)} startIcon={<EditIcon />}>         
          </Button>
          <IconButton color="secondary" onClick={() => handleDeleteDialogOpen(params.id as string)}>
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
      <div style={{ height: 400, width: '100%' }}>
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
