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
import AddACamps from "../DashBoard/Organizer/AddCamps/AddACamps";
import ManageCamps from "../DashBoard/Organizer/ManageCamps/ManageCamps";
import UpdateCamp from "../DashBoard/Organizer/ManageCamps/UpdateCamp";
import ManageRegisteredCamp from "../DashBoard/Organizer/ManageRegisteredCamp/ManageRegisteredCamp";
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
                   },
                   {
                    path: 'add-a-camp',
                    element: <AddACamps></AddACamps>
                   },
                   {
                    path: 'manage-camps',
                    element: <ManageCamps></ManageCamps>
                   },
                   {
                    path: '/dashboard/update-camp/:campId',
                    element: <UpdateCamp></UpdateCamp>
                   },
                   {
                    path: 'manage-registered-camps',
                    element: <ManageRegisteredCamp></ManageRegisteredCamp>
                   } 
                ]
            }
        ]
    },
]);

export default MyRouts;