// import React from 'react';

import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import { Helmet } from "react-helmet-async";
import Title from "../../Components/Title/Title";
import CampCalender from "../../Components/CampDetails/CampCalender";
import UpcomingCampDetailsCard from "./UpcomingCampDetailsCard";



const UpcomingCampDetails = () => {
    const { campId } = useParams()
    const axiosPublic = useAxiosPublic();
    
    const { data: singleCamp = [], isLoading } = useQuery({
        queryKey: ['singleupcomingcampdetails'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/upcommingcamps/${campId}`)
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
                <title>Mediserve Mobilize | Upcoming  Camp Details</title>
            </Helmet>
            <Title title={'Upcoming Camp Details'} desc={` Camp details of the upcoming ${singleCamp?.campName}`}></Title>

            <div>
                <div className="flex justify-center  gap-10 flex-wrap">
                    {/* <CampDetailsCard camp={singleCamp}></CampDetailsCard> */}
                    <UpcomingCampDetailsCard camp={singleCamp}></UpcomingCampDetailsCard>
                    <CampCalender date={singleCamp?.DateAndTime}></CampCalender>
                </div>
            </div>
        </div>
    );
};

export default UpcomingCampDetails;