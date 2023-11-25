// import React from 'react';

import { NavLink, Outlet } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { AddHomeRounded, CalendarMonth, ContactMail, HomeOutlined, PaymentOutlined, ShopSharp } from "@mui/icons-material";
import RateReviewSharpIcon from '@mui/icons-material/RateReviewSharp';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MenuIcon from '@mui/icons-material/Menu';
import { FaUsersGear } from "react-icons/fa6";
import { FaUtensils } from "react-icons/fa";
import { FaThList } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
const DashBoard = () => {
    const organizer = true
    return (
        <div className="grid grid-cols-5 sm:grid-cols-3 md:grid-cols-4 gap-4 bg-blue-50">
            {/* dashboard sidebar */}
            <div className="w-full min-h-screen bg-blue-500 col-span-2 sm:col-span-1">
                <ul className="menu text-white font-medium">
                    {
                        organizer ? <>
                            <li>
                                <NavLink to={'/dashboard/organizer-profile'}> <AddHomeRounded></AddHomeRounded> Organizer Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/additems'}> < FaUtensils></FaUtensils> Add Items</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/manageitems'}> <FaThList></FaThList> Manage Items</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/managebookings'}> <FaBook></FaBook> Manage Bookings</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/allusers'}> <FaUsersGear></FaUsersGear> All Users</NavLink>
                            </li>

                        </> : <>
                            <li>
                                <NavLink to={'/dashboard/usershome'}> <AddHomeRounded></AddHomeRounded> User Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/paymenthistory'}> <CalendarMonth></CalendarMonth> Payment History</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/payment'}> <PaymentOutlined></PaymentOutlined> Payment</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/cart'}> <AddShoppingCartIcon></AddShoppingCartIcon> My Carts ()</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/addreview'}> <RateReviewSharpIcon></RateReviewSharpIcon> Add Review</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/mybooking'}> <LibraryBooksIcon></LibraryBooksIcon> My Booking</NavLink>
                            </li>
                        </>
                    }
                    <div className="divider"></div>
                    <li>
                        <NavLink to={'/'}> <HomeOutlined></HomeOutlined> Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/ourmenu'}> <MenuIcon></MenuIcon> Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/ourshop/soup'}> <ShopSharp></ShopSharp> Shop</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/contact'}> <ContactMail></ContactMail> Contact</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content  */}
            <div className="col-span-3 sm:col-span-2 md:col-span-3 p-4">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;