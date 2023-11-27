// import React from 'react';

import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";


const MainLayout = () => {
    return (
        <div>

            <div className="sticky top-0 z-20 w-full">
                <div className="">
                    <div className="">
                        <NavBar></NavBar>
                    </div>
                </div>
            </div>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;