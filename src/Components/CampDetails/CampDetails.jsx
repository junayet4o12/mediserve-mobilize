// import React from 'react';

import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Title from "../Title/Title";
import CampDetailsCard from "./CampDetailsCard";
import CampCalender from "./CampCalender";
import Loading from "../Loading";
import { Helmet } from "react-helmet-async";

const CampDetails = () => {
    const { campId } = useParams()
    const axiosPublic = useAxiosPublic();
    
    const { data: singleCamp = [], isLoading } = useQuery({
        queryKey: ['singlecampdetails'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/camps/${campId}`)
            return res?.data
        }
    })
    console.log(singleCamp);
    if (isLoading ) {
        return <Loading></Loading>
    }
    
    return (
        <div className="bg-blue-50 py-10 px-5">
            <Helmet>
                <title>Mediserve Mobilize |  Camp Details</title>
            </Helmet>
            <Title title={'Camp Details'} desc={` Camp details of the ${singleCamp?.campName}`}></Title>

            <div>
                <div className="flex justify-center  gap-10 flex-wrap">
                    <CampDetailsCard camp={singleCamp}></CampDetailsCard>
                    <CampCalender date={singleCamp?.DateAndTime}></CampCalender>
                </div>
            </div>
        </div>
    );
};

export default CampDetails;