// import React from 'react';

import { NavLink, Outlet } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { AddHomeRounded, CalendarMonth, PaymentOutlined } from "@mui/icons-material";
import RateReviewSharpIcon from '@mui/icons-material/RateReviewSharp';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

import { MdOutlineAddBusiness } from "react-icons/md";
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { GiArchiveRegister } from "react-icons/gi";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Components/Loading";
const DashBoard = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: organiserdata = {}, isLoading } = useQuery({
        queryKey: ['organizersData', user],
        enabled: !!user?.email && !!localStorage.getItem('token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res?.data
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }
  const   isOrganizer = organiserdata?.organizerRole
    return (
        <div className="grid grid-cols-5 sm:grid-cols-3 md:grid-cols-4 sm:gap-4 bg-blue-50 relative">
            {/* dashboard sidebar */}
            <div className="w-full min-h-screen bg-blue-500 col-span-2 sm:col-span-1">
                <ul className="menu text-white font-medium sticky top-20">
                    {
                        isOrganizer ? <>
                            <li>
                                <NavLink to={'/dashboard/organizer-profile'}> <AddHomeRounded></AddHomeRounded> Organizer Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/add-a-camp'}> < MdOutlineAddBusiness></MdOutlineAddBusiness> Add Camps</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/manage-camps'}><ManageHistoryIcon></ManageHistoryIcon> Manage Camps</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/manage-registered-camps'}> <GiArchiveRegister></GiArchiveRegister> Manage Registered Camp</NavLink>
                            </li>
                           

                        </> : <>
                            <li>
                                <NavLink to={'/dashboard/participant-profile'}> <AddHomeRounded></AddHomeRounded> Participant Profile</NavLink>
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

                </ul>
            </div>
            {/* dashboard content  */}
            <div className="col-span-3 sm:col-span-2 md:col-span-3 py-4 p-1 sm:p-4">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;