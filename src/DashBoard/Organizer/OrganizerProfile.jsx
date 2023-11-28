// import React from 'react';

import { useContext, useState } from "react";
import { AuthContext } from "../../firebase/authProvider/AuthProviders";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Title from '../../Components/Title/Title'
import './Organizer.css'
import AllCard from "./AllCard";
import OrganizersFeedback from "./OrganizersFeedback";
import UpdateProfile from "./UpdateProfile";
import { Helmet } from "react-helmet-async";
const OrganizerProfile = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { data: organizerProfile = {}, refetch } = useQuery({
        queryKey: ['organizerProfile', user],
        enabled: !!user?.email && !!localStorage.getItem('token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/organizers/${user?.email}`)
            return res?.data
        }
    })
    console.log(organizerProfile);
    return (
        <div>
            <Helmet>
                <title>Mediserve Mobilize |  Organizer Profile</title>
            </Helmet>
            <Title title={'Organizer Profile'} desc={'Your Profile as Organizer'}></Title>
            <div className="flex gap-y-5 gap-x-10 flex-wrap">
                <img className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] object-cover overflow-hidden rounded-full shadow-xl" src={user?.photoURL} alt="" />
                <div className=" max-w-[350px] text-xl  md:text-2xl font-medium">
                    <h2 className="text-2xl font-bold  pt-3 text-black"> {organizerProfile?.name} </h2>
                    <h2 className="  pt-3  text-black"> Age: {organizerProfile?.age || 'Not Given!'} </h2>
                    <h2 className="  pt-3  text-black"> Country: {organizerProfile?.country || 'Not Given!'} </h2>
                </div>
            </div>
            <div className="bg-blue-100 p-5 my-7 max-w-[500px]">
                <h1 className="font-bold text-2xl sm:text-3xl  pb-3">Contact Info</h1>
                <h2 className="text-base sm:text-xl font-medium pt-3"><span className="underline font-bold">Email:</span> {organizerProfile?.email} </h2>
                <h2 className="text-base sm:text-xl font-medium pt-3"><span className="underline font-bold">Contact No.:</span> {organizerProfile?.contactNumber || 'Not Given!'} </h2>
            </div>
            <div>
                <button onClick={handleOpen} className="btn btn-neutral bg-blue-400 border-none rounded-sm profileUpdatebtn">Update Profile</button>
            </div>

            <div>
                <div>
                    <AllCard></AllCard>
                </div>
                <div>
                   <OrganizersFeedback></OrganizersFeedback>
                </div>
                <div>
                    <UpdateProfile handleClose={handleClose} open={open} profile={organizerProfile} refetch={refetch}></UpdateProfile>
                </div>
            </div>
        </div>
    );
};

export default OrganizerProfile;