/* eslint-disable react/prop-types */
// import React from 'react';

import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { AuthContext } from "../../firebase/authProvider/AuthProviders";

const PrivateRouts = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation()
    if (loading) {
        return <div className="h-max w-max mx-auto mt-20">
            <Box sx={{ position: 'relative' }}>
                <CircularProgress
                    variant="determinate"
                    sx={{
                        color: 'gray'
                    }}
                    size={40}
                    thickness={4}
                    value={100}
                />
                <CircularProgress
                    variant="indeterminate"
                    disableShrink
                    sx={{
                        color: 'blue',
                        animationDuration: '550ms',
                        position: 'absolute',
                        left: 0,
                        
                    }}
                    size={40}
                    thickness={4}
                />
            </Box>
        </div>
    }
    if (user) {
        return <div>
            {children}
        </div>

    }
    return <Navigate to={'/login'} state={{from: location}}></Navigate>;
};

export default PrivateRouts;