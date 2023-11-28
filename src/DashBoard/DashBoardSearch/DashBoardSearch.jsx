// import React from 'react';

import { TextField } from "@mui/material";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading";
import useProfessional from "../../hooks/useProfessional";
import useOrganizers from "../../hooks/useOrganizers";
// import { all } from "axios";

const DashBoardSearch = () => {
    const axiosPublic = useAxiosPublic();
    const [searchingData, setSearchingData] = useState([])
    const [isProfessional, isProfessionalPanding] = useProfessional()
    const [isOrganizer, isOrganizerPanding] = useOrganizers()
    const { data: searchesData, isLoading } = useQuery({
        queryKey: ['searchesData'],
        queryFn: async () => {
            const res = await axiosPublic.get('/campnameid')
            return res?.data
        }
    })
    if (isLoading || isOrganizerPanding || isProfessionalPanding) {
        return <Loading></Loading>
    }

    const newSearchingData = searchesData.map(data => ({
        routs: `/camp-details/${data?._id}`,
        name: `See ${data?.campName} Details`

    }))
    const otherRouts = [
        {
            routs: '/',
            name: 'Go to Home'
        },
        {
            routs: '/availablecamps',
            name: 'See Available Camps'
        },
        {
            routs: '/register',
            name: 'Go for Register'
        },
        {
            routs: '/login',
            name: 'Go for Log In'
        },
    ]
    const participantRouts = [

        {
            routs: '/dashboard/participant-profile',
            name: 'Go to participant Profile'
        },
        {
            routs: '/dashboard/registered-camps',
            name: 'manage your Registered Camp'
        },
        {
            routs: '/dashboard/payment-history',
            name: 'See Payment History'
        },
        {
            routs: '/dashboard/feedback-and-ratings',
            name: 'go to feedback and ratings to give feedback'
        }
    ]
    const organizerRouts = [
        {
            routs: '/dashboard/organizer-profile',
            name: 'Go to organizer Profile'
        },
        {
            routs: '/dashboard/add-a-camp',
            name: 'Go to add a camp'
        },
        {
            routs: '/dashboard/manage-camps',
            name: 'Go to manage camps'
        },
        {
            routs: '/dashboard/manage-registered-camps',
            name: 'Go to manage registered camps'
        },

    ]
    const prefessionalRouts = [
        {
            routs: '/dashboard/professional-profile',
            name: 'Go to professional Profile'
        },
    ]
    console.log(isOrganizer);
    let allsearchesData = []
    if (isProfessional) {
        allsearchesData = [...newSearchingData, ...otherRouts, ...prefessionalRouts]
    }
    else if (isOrganizer) {

        allsearchesData = [...newSearchingData, ...otherRouts, ...organizerRouts]
    }
    
    else {
        allsearchesData = [...newSearchingData, ...otherRouts, ...participantRouts]
    }

    const handleChange = e => {
        e.preventDefault()

        const searchdata = allsearchesData.filter(data => data?.name.toLowerCase().includes(e.target.value.toLowerCase()))
        if (e.target.value === '') {
            return setSearchingData([])
        }

        setSearchingData(searchdata)
        // item.campName.toLowerCase().includes(searchTerm.toLowerCase())
    }
    return (
        <div>
            <div className="w-[95%] sm:w-[65%]    p-2  text-lg font-bold">Please search routs to navigate Easily</div>
            <div className="flex flex-wrap justify-start gap-x-5 gap-y-3 items-center">
                <div className="w-[95%] sm:w-[65%]   shadow-xl">
                    <TextField sx={{ width: '100%', borderRadius: '8px', background: 'white' }} onChange={handleChange} id="outlined-basic" label="Write routs..." variant="outlined" />

                </div>


            </div>
            <div className="w-[95%] sm:w-[65%]   shadow-xl">
                {
                    searchingData?.map(data => <Link onClick={() => setSearchingData([])} key={data?.routs} to={`${data?.routs}`}><div className="w-full p-3  hover:bg-gray-200">{data?.name}</div></Link>)
                }
            </div>
        </div>
    );
};

export default DashBoardSearch;