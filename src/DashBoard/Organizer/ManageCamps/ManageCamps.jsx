// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import Title from "../../../Components/Title/Title";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ManageCampTable from "./ManageCampTable";
import Loading from "../../../Components/Loading";
import { Helmet } from "react-helmet-async";

const ManageCamps = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: yourcamps = {}, isLoading, refetch } = useQuery({
        queryKey: ['youradddedcamps', user],
        enabled: !!user?.email && !!localStorage.getItem('token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/campsbyemail/${user?.email}`)
            return res?.data
        }
    })
    

    if (isLoading ) {
        return <Loading></Loading>
    }
    
    return (
        <div className="bg-blue-50"> 
        <Helmet>
                <title>Mediserve Mobilize |  Manage Camp</title>
            </Helmet>
            <Title title={'Manage Camps'} desc={'Manage Camps Add by You'}></Title>
           <ManageCampTable refetch={refetch} yourcamps={yourcamps}></ManageCampTable>
        </div>
    );
};

export default ManageCamps;