// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Title from "../../Components/Title/Title";
import CampCard from "../PopularCamp/CampCard";
import UpcommingCampCard from "./UpcommingCampCard";

const UpcommingCamp = () => {
    const axiosPublic = useAxiosPublic()
    const {data: upcommingCamp=[]} = useQuery({
        queryKey: ['upcommingCamp'],
        queryFn: async ()=> {
            const res = await axiosPublic.get('upcommingcamps')
            return res?.data
        }
    })
    return (
        <div className="bg-blue-50 py-10">
            <Title title={'Upcomming Camp'} desc={'Discover Our Upcoming Health Camps'}></Title>
            <div className='flex flex-wrap justify-center items-center gap-10'>
                {
                    upcommingCamp.map(camp=><UpcommingCampCard key={camp?._id} camp={camp}></UpcommingCampCard>)
                }
            </div>
        </div>
    );
};

export default UpcommingCamp;