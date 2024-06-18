# Car Management System

This project is a Car Management System built using the MERN stack (MongoDB, Express, React, Node.js) and Next.js for the frontend. The system includes user authentication, CRUD operations for cars and categories, and features such as sorting, pagination, and data validation.

## Features

- User Authentication (Sign Up, Sign In)
- Welcome email on Sign Up with randomly generated password
- Dashboard showing the number of registered cars
- CRUD operations for categories (Bus, Sedan, SUV, Hatchback, etc.)
- CRUD operations for cars with fields such as make, model, color, registration number, etc.
- Data tables for sorting and pagination
- JWT-based authentication
- Front-end and back-end data validation

## Technologies Used

- Frontend: Next.js, React, TypeScript, Material-UI
- Backend: Node.js, Express, MongoDB
- Authentication: JWT (JSON Web Tokens)
- API Documentation: Swagger
- Email Service: Nodemailer (or any preferred email service)

## Prerequisites

- Node.js (>=14.x)
- MongoDB (running locally or a MongoDB Atlas account)
- Yarn or npm

## Getting Started

### Backend Setup

1. **Clone the repository**

    ```bash
    git clone https://github.com/your-username/car-management-system.git
    cd car-management-system
    ```

2. **Navigate to the backend directory**

    ```bash
    cd car-management-backend
    ```

3. **Install dependencies**

    ```bash
    npm install
    ```

4. **Create a `.env` file in the backend root directory and add the following variables:**

    ```env
    PORT=5000
    MONGO_URI=your_mongo_db_uri
    JWT_SECRET=your_jwt_secret
    EMAIL_SERVICE=your_email_service
    EMAIL_USER=your_email_user
    EMAIL_PASS=your_email_password
    ```

5. **Start the backend server**

    ```bash
    npm start
    ```

6. **API Documentation**

   The Swagger documentation will be available at `http://localhost:5000/api-docs`.

### Frontend Setup

1. **Navigate to the frontend directory**

    ```bash
    cd ../car-management-frontend
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Create a `.env.local` file in the frontend root directory and add the following variables:**

    ```env
    NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
    ```

4. **Start the frontend server**

    ```bash
    npm run dev
    ```

5. **Access the application**

   Open your browser and navigate to `http://localhost:3000`.

## Project Structure

### Backend

