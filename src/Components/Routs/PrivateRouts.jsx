/* eslint-disable react/prop-types */
// import React from 'react';

import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { AuthContext } from "../../firebase/authProvider/AuthProviders";
import Loading from "../Loading";

const PrivateRouts = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation()
    if (loading) {
        return <Loading></Loading>
    }
    if (user) {
        return <div>
            {children}
        </div>

    }
    return <Navigate to={'/login'} state={{from: location}}></Navigate>;
};

export default PrivateRouts;