// import React from 'react';

import { useContext } from "react";
import { AuthContext } from "../../firebase/authProvider/AuthProviders";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Title from '../../Components/Title/Title'
import './Organizer.css'
const OrganizerProfile = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    const { data: organizerProfile = {} } = useQuery({
        queryKey: ['organizerProfile', user],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res?.data
        }
    })
    console.log(organizerProfile);
    return (
        <div>
            <Title title={'Organizer Profile'} desc={'Your Profile as Organizer'}></Title>
            <div className="flex gap-10">
                <img className="w-[200px] h-[200px] object-cover overflow-hidden rounded-full shadow-xl" src={user?.photoURL} alt="" />
                <div className=" max-w-[350px]  text-2xl font-medium">
                    <h2 className="text-2xl font-bold  pt-3 text-black"> {organizerProfile?.name} </h2>
                    <h2 className="  pt-3  text-black"> Age: {organizerProfile?.age || 'Not Given!'} </h2>
                    <h2 className="  pt-3  text-black"> Country: {organizerProfile?.Country || 'Not Given!'} </h2>
                </div>
            </div>
            <div className="bg-blue-100 p-5 my-7 max-w-[500px]">
                <h1 className="font-bold text-3xl text-center pb-3">Contact Info</h1>
                <h2 className="text-xl font-medium pt-3"><span className="underline font-bold">Email Address:</span> {organizerProfile?.email} </h2>
                <h2 className="text-xl font-medium pt-3"><span className="underline font-bold">Contact Number:</span> {organizerProfile?.contactNumber || 'Not Given!'} </h2>
            </div>
<div>
    <button className="btn btn-neutral bg-blue-400 border-none rounded-sm profileUpdatebtn">Update Profile</button>
</div>
        </div>
    );
};

export default OrganizerProfile;