import React from 'react';
import Layout from '../components/Layout';

import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom';
import Login from '../HomePage/LoginPage';
import LoginPage from '../HomePage/LoginPage';
import CustomerRegisterForm from '../customer/CustomerRegisterForm';
import AuthPage from '../components/AuthPage';
import EmployeeList from '../components/Employee/EmployeeList';
import EmployeeForm from '../components/Employee/EmployeeForm';
import EmployeeHistory from '../components/Employee/EmployeeHistory';
import VehicleList from '../components/Vehicle/VehicleList';
import VehicleForm from '../components/Vehicle/VehicleForm';
import VehicleHistory from '../components/Vehicle/VehicleHistory';

// Wrapper để lấy :id từ URL và truyền vào ContractDetail


const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "login",
          element: <LoginPage/>
        },
        {
          path:"customer-register",
          element:<CustomerRegisterForm/>
        },
        {
          path: "employees",
          element: <EmployeeList/>
        },
        {
          path: "employees/:id",
          element: <EmployeeForm/>
        },
        {
          path: "employees/:id/history",
          element: <EmployeeHistory/>
        },
        {
          path: "vehicles",
          element: <VehicleList/>
        },
        {
          path: "vehicles/:id",
          element: <VehicleForm/>
        },
        {
          path: "vehicles/:id/history",
          element: <VehicleHistory/>
        },
       
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default Router;
