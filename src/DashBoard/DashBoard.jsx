// import React from 'react';

import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineUpcoming } from "react-icons/md";
import { VscFeedback } from "react-icons/vsc";
import { MdOutlineAddBusiness } from "react-icons/md";
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { GiArchiveRegister } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { FaRegIdCard } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Components/Loading";
import useProfessional from "../hooks/useProfessional";
import { Helmet } from "react-helmet-async";
import DashBoardSearch from "./DashBoardSearch/DashBoardSearch";
const DashBoard = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const [isProfessional, isProfessionalPanding] = useProfessional()
    const { data: organiserdata = {}, isLoading } = useQuery({
        queryKey: ['organizersData', user],
        enabled: !!user?.email && !!localStorage.getItem('token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res?.data
        }
    })
    if (isLoading || isProfessionalPanding) {
        return <Loading></Loading>
    }
    const isOrganizer = organiserdata?.organizerRole
    // const isProfessional = true;
    return (
        <div className="grid grid-cols-5 sm:grid-cols-3 md:grid-cols-4 sm:gap-4 bg-blue-50 relative">
            {/* dashboard sidebar */}
            <Helmet>
                <title>Mediserve Mobilize |  Dashboard</title>
            </Helmet>
            <div className="w-full min-h-screen bg-blue-500 col-span-2 sm:col-span-1">
                <ul className="menu text-white font-medium sticky top-20">
                    {
                        isOrganizer ?
                            <>
                                {
                                    isProfessional ?
                                        <>
                                        {/* professionalrouts  */}
                                            <li>
                                                <NavLink to={'/dashboard/professional-profile'}> <span className="text-lg"><ImProfile></ImProfile> </span>professional Profile</NavLink>
                                            </li>
                                        </>
                                        :
                                        <>
                                        {/* organizerrouts  */}
                                            <li>
                                                <NavLink to={'/dashboard/organizer-profile'}> <span className="text-lg"><ImProfile></ImProfile> </span>Organizer Profile</NavLink>
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
                                            <li>
                                                <NavLink to={'/dashboard/add-upcoming-camp'}> <span className="text-lg"><MdOutlineUpcoming></MdOutlineUpcoming></span> Add Upcomming Camp</NavLink>
                                            </li>


                                        </>
                                }
                            </>
                            :
                            <>
                            {/* participants routs  */}
                                <li>
                                    <NavLink to={'/dashboard/participant-profile'}> <span className="text-lg"><ImProfile></ImProfile> </span> Participant Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/registered-camps'}> <FaRegIdCard></FaRegIdCard> Manage your registered Camp</NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/payment-history'}> <FaHistory></FaHistory>Payment History</NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/feedback-and-ratings'}> <VscFeedback></VscFeedback>Give Feedback</NavLink>
                                </li>



                            </>
                    }

                </ul>
            </div>
            {/* dashboard content  */}
            <div className="col-span-3 sm:col-span-2 md:col-span-3 py-4 p-1 sm:p-4">
                <DashBoardSearch></DashBoardSearch>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;