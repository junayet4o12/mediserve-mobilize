// import React from 'react';

import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";

 
const MainLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;