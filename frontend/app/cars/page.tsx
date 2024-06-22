"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Button, Box } from "@mui/material";
import withAuth from "../../utils/withAuth";
import Link from "next/link";
import ListCars from "../../components/carList";
import { useRouter } from "next/navigation";
import MainHeader from "@/components/header";


const Dashboard: React.FC = () => {
  const router = useRouter();
  return (
    <Container>  
  <MainHeader/>
  
      <Box sx={{ mt: 4 }}>
      <Button
        variant="contained"
        sx={{ mb: 3 }}
        color="primary"
        onClick={(e) => {
          router.push("/cars/add");
        }}
      >
        Add a Car
      </Button>
        <ListCars />
      </Box>
    </Container>
  );
};

export default withAuth(Dashboard);
