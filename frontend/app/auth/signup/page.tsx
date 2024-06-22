"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IFormInput {
  name: string;
  email: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
});

const Signup: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("token") !== null
    ) {
      router.push("/dashboard");
    }
  }, [router]);
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setErrorMessage("");
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    try {
      const response = await axios.post(`${baseUrl}/api/auth/signup`, data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error?.response?.data?.msg);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom sx={{ mt: 5 }}>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ""}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
        />
        {errorMessage !== "" ? (
          <Typography variant="body1" color="red">
            {errorMessage}
          </Typography>
        ) : (
          ""
        )}
        <Box
          sx={{
            fontSize: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Button type="submit" variant="contained" color="primary">
            Sign up
          </Button>
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={(e) => {
              router.push("/auth/signin");
            }}
          >
            {" "}
            Already have an account signin
          </span>
        </Box>
      </form>
    </Container>
  );
};

export default Signup;
