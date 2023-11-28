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
import OrganizerRouts from "../Components/Routs/OrganizerRouts";
import ParticipantsProfile from "../DashBoard/Participants/ParticipantsProfile/ParticipantsProfile";
import ManageParticipantsCamps from "../DashBoard/Participants/ManageParticipantsCamps/ManageParticipantsCamps";
import PaymentHistory from "../DashBoard/Participants/PaymentHistory/PaymentHistory";
import Feedback from "../DashBoard/Participants/Feedback/Feedback";
import ProfessionalsProfile from "../DashBoard/Professionals/ProfessionalsProfile/ProfessionalsProfile";
import ProfessionalRouts from "../Components/Routs/ProfessionalRouts";
import Error from "../Components/Four0Four/Error";
import AddUpcomingCamp from "../DashBoard/Organizer/AddUpcommingCamp/AddUpcomingCamp";
import UpcomingCampDetails from '../Home/UpcommingCamp/UpcomingCampDetails'
const MyRouts = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <Error></Error>,
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
                path: '/upcoming-camp-details/:campId',
                element: <UpcomingCampDetails></UpcomingCampDetails>
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
                    // organizer routs Start 
                    {
                        path: 'organizer-profile',
                        element: <OrganizerRouts><OrganizerProfile></OrganizerProfile></OrganizerRouts>
                    },
                    {
                        path: 'add-a-camp',
                        element: <OrganizerRouts><AddACamps></AddACamps></OrganizerRouts>
                    },
                    {
                        path: 'manage-camps',
                        element: <OrganizerRouts><ManageCamps></ManageCamps></OrganizerRouts>
                    },
                    {
                        path: '/dashboard/update-camp/:campId',
                        element: <OrganizerRouts><UpdateCamp></UpdateCamp></OrganizerRouts>
                    },
                    {
                        path: 'manage-registered-camps',
                        element: <OrganizerRouts><ManageRegisteredCamp></ManageRegisteredCamp></OrganizerRouts>
                    },
                    {
                        path: 'add-upcoming-camp',
                        element: <OrganizerRouts><AddUpcomingCamp></AddUpcomingCamp></OrganizerRouts>
                    }
                    // organizer routs end
                    ,
                    // participant routs Start 
                    {
                        path: 'participant-profile',
                        element: <ParticipantsProfile></ParticipantsProfile>
                    },
                    {
                        path: 'registered-camps',
                        element: <ManageParticipantsCamps></ManageParticipantsCamps>
                    },
                    {
                        path: 'payment-history',
                        element: <PaymentHistory></PaymentHistory>
                    },
                    {
                        path: 'feedback-and-ratings',
                        element: <Feedback></Feedback>
                    },
                    // participant routs end

                    // Professionals  routs start
                    {
                        path: 'professional-profile',
                        element: <ProfessionalRouts><ProfessionalsProfile></ProfessionalsProfile></ProfessionalRouts>
                    }
                    // Professionals  routs end


                ]
            }
        ]
    },
]);

export default MyRouts;