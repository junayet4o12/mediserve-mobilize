// import React from 'react';

import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Title from "../../../Components/Title/Title";
import UpdateProfile from "../../Organizer/UpdateProfile";
import ParticipantRegisteredTable from "./ParticipantRegisteredTable";

const ParticipantsProfile = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
     const { data: userProfile = {}, refetch } = useQuery({
        queryKey: ['participantsData', user],
        enabled: !!user?.email && !!localStorage.getItem('token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res?.data
        }
    })
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
   
    console.log(userProfile);
    return (
        <div>
            <Title title={'Participant Profile'} desc={'Your Profile as Participant'}></Title>
            <div className="flex gap-y-5 gap-x-10 flex-wrap">
                <img className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] object-cover overflow-hidden rounded-full shadow-xl" src={user?.photoURL} alt="" />
                <div className=" max-w-[350px] text-xl  md:text-2xl font-medium">
                    <h2 className="text-2xl font-bold  pt-3 text-black"> {userProfile?.name} </h2>
                    <h2 className="  pt-3  text-black"> Age: {userProfile?.age || 'Not Given!'} </h2>
                    <h2 className="  pt-3  text-black"> Country: {userProfile?.country || 'Not Given!'} </h2>
                </div>
            </div>
            <div className="bg-blue-100 p-5 my-7 max-w-[500px]">
                <h1 className="font-bold text-2xl sm:text-3xl  pb-3">Contact Info</h1>
                <h2 className="text-base sm:text-xl font-medium pt-3"><span className="underline font-bold">Email:</span> {userProfile?.email} </h2>
                <h2 className="text-base sm:text-xl font-medium pt-3"><span className="underline font-bold">Contact No.:</span> {userProfile?.contactNumber || 'Not Given!'} </h2>
            </div>
            <div>
                <button onClick={handleOpen} className="btn btn-neutral bg-blue-400 border-none rounded-sm profileUpdatebtn">Update Profile</button>
            </div>
            <div>
                <ParticipantRegisteredTable profile={userProfile}></ParticipantRegisteredTable>
            </div>
            <div>
                <UpdateProfile handleClose={handleClose} open={open} profile={userProfile} refetch={refetch}></UpdateProfile>
            </div>
        </div>
    );
};

export default ParticipantsProfile;