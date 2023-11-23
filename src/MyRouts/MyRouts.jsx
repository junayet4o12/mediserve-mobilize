// import React from 'react';

import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../MainLayout/MainLayout'
import Home from '../Home/Home'
const MyRouts = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            }
        ]
    },
]);

export default MyRouts;