"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Button, Box } from "@mui/material";
import withAuth from "../../utils/withAuth";
import { useRouter } from "next/navigation";
interface Car {
  _id: string;
  category: string;
  color: string;
  model: string;
  make: string;
  registrationNo: string;
}

const Dashboard: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchCars = async () => {
      const token = localStorage.getItem("token");
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      try {
        const response = await axios.get(baseUrl + "/api/cars", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCars(response.data);
      } catch (error) {
        console.error(error);
        // Redirect to sign in page if error occurs
        // window.location.href = '/auth/signin';
      }
    };

    fetchCars();
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth/signin";
  };
  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Button onClick={logout} variant="contained" color="error">
          Logout
        </Button>
      </Box>

      <Typography variant="h6">
        Number of registered cars: {cars.length}
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        color="primary"
        onClick={(e) => {
          router.push("/cars");
        }}
      >
        Manage Car
      </Button>
      <Button variant="contained"   onClick={(e) => {
          router.push("/categories");
        }} sx={{ mt: 2, ml: 2 }} color="secondary">
        Manage Category
      </Button>
    
    </Container>
  );
};

export default withAuth(Dashboard);
