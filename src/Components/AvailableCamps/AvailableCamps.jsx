// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Title from "../Title/Title";
import CampCard from "../../Home/PopularCamp/CampCard";
import AvailableCampsCard from "./AvailableCampsCard";
import { Helmet } from "react-helmet-async";
import Loading from "../Loading";

const AvailableCamps = () => {
    const axiosPublic = useAxiosPublic()

    const { data: availableCamp = [], isLoading } = useQuery({
        queryKey: ['availableCamp'],
        queryFn: async () => {
            const res = await axiosPublic.get('/camps')
            return res?.data
        }
    })
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className="bg-blue-50">
            <Helmet>
                <title>Mediserve Mobilize | Available Camp</title>
            </Helmet>
            <Title title={'Available Camps'} desc={'Explore Our Health Camps'}></Title>
            <div className='flex flex-wrap  justify-center   gap-10'>
                {
                    availableCamp.map((camp, idx)=><AvailableCampsCard idx={idx} key={camp?._id} camp={camp}></AvailableCampsCard>)
                }
            </div>
        </div>
    );
};

export default AvailableCamps;