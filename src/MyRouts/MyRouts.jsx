// import React from 'react';

import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../MainLayout/MainLayout'
import Home from '../Home/Home'
import CampDetails from "../Components/CampDetails/CampDetails";
import Register from "../Components/Register/Register";
import LogIn from "../Components/LogIn/LogIn";
import AvailableCamps from "../Components/AvailableCamps/AvailableCamps";
// import { Dashboard } from "@mui/icons-material";
import PrivateRouts from "../Components/Routs/PrivateRouts";
import DashBoard from "../DashBoard/DashBoard";
import OrganizerProfile from "../DashBoard/Organizer/OrganizerProfile";
const MyRouts = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/camp-details/:campId',
                element: <CampDetails></CampDetails>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <LogIn></LogIn>
            },
            {
                path: '/availablecamps',
                element: <AvailableCamps></AvailableCamps>
            },
            // dashboard started 
            {
                path: '/dashboard',
                element: <PrivateRouts><DashBoard></DashBoard></PrivateRouts>,
                children: [
                   {
                     path: 'organizer-profile',
                     element: <OrganizerProfile></OrganizerProfile>
                   } 
                ]
            }
        ]
    },
]);

export default MyRouts;