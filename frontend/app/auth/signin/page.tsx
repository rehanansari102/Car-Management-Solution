"use client"
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
interface IFormInput {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup.string().required('Password is required')
});

const Signin: React.FC = () => {
  const [errorMessage,setErrorMessage] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema)
  });

  const router = useRouter();
  useEffect(()=>{
    if(typeof window !== 'undefined' && localStorage.getItem('token') !== null) {
      router.push('/dashboard');
    }
  },[router])
  const onSubmit: SubmitHandler<IFormInput> = async data => {
    try {
      setErrorMessage("");
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await axios.post(`${baseUrl}/api/auth/signin`, data);
      if(response){
        localStorage.setItem('token', response.data.token);
        router.push('/dashboard');
      }     
    } catch (error : any) {
      setErrorMessage(error?.response?.data?.msg)
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{mt:5}} gutterBottom>
        Sign In
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ''}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ''}
        />
        {errorMessage!==""?<Typography variant="h6" color="red">
        {errorMessage}
      </Typography>:""}
        <Button type="submit" sx={{mt:1}} variant="contained" color="primary">
          Sign In
        </Button>
      </form>
    </Container>
  );
};

export default Signin;
