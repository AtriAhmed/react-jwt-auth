import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./components/admin/Dashboard";
import PrivateRoute from "./components/auth/PrivateRoute";
import Home from "./components/Home/Home";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "./components/admin/layout/AdminLayout";
import Register from "./components/auth/Register";
import Users from "./components/admin/users/Users";
import AuthProvider from "./contexts/AuthProvider";
import axios from "axios";
import Layout from "./layouts/Layout";
import ResetPasswordRequest from "./components/auth/ResetPasswordRequest";
import ResetPassword from "./components/auth/ResetPassword";
import ClientLayout from "./layouts/ClientLayout";
import User from "./components/admin/users/User";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Error from "./components/Error";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('ELCAMBA_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "admin",
        element: <PrivateRoute component={AdminLayout} aId={2} />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
         
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "users/:id",
            element: <User />,
          },        
        ],
      },
      {
        path: "",
        element: <ClientLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordRequest />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(  
    <HelmetProvider>
      <Helmet>
        <title>ELCAMBA</title>
      </Helmet>
      <AuthProvider>
            <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>
);
