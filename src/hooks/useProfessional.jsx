// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useProfessional = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: isProfessional, isPending: isProfessionalPanding } = useQuery({
        queryKey: [user?.email, 'professional'],
        enabled: !!user?.email && !!localStorage.getItem('token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/professional/${user?.email}`);
            console.log(res?.data?.professional);

            return res?.data?.professional
        }
    })
    return [isProfessional, isProfessionalPanding]
};

export default useProfessional;