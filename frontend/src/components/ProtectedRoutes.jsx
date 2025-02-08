import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp > currentTime; // Check if token is expired
    } catch (error) {
        return false;
    }
};

const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children :( <>{alert("Please Login First")}<Navigate to="/" replace /></>);
};

export default ProtectedRoute;
