import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Private component is also called Private routes.
export default function PrivateComponent() {
    const auth = localStorage.getItem('user');
    return auth ? <Outlet /> : <Navigate to="/signup" />
}