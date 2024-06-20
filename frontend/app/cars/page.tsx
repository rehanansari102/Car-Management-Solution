"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Button, Box } from "@mui/material";
import withAuth from "../../utils/withAuth";
import Link from "next/link";
import ListCars from "../../components/carList";
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
   

      <Box sx={{ mt: 4 }}>
        <ListCars />
      </Box>
    </Container>
  );
};

export default withAuth(Dashboard);
