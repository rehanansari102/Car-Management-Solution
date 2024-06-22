"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Button, Box } from "@mui/material";
import withAuth from "../../utils/withAuth";
import { useRouter } from "next/navigation";
import MainHeader from "@/components/header";
import { get } from '../../utils/api';
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
    
      try {
        const response = await get("/api/cars");
        setCars(response.data);
      } catch (error : any) {
        console.log(error)
      }
    };

    fetchCars();
  }, []);
 
  return (
    <Container>
     
       <MainHeader/>
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
