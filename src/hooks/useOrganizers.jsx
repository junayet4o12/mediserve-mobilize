// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useOrganizers = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: isOrganizer, isPending: isOrganizerPanding } = useQuery({
        queryKey: [user?.email, 'organizer'],
        enabled: !!user?.email && !!localStorage.getItem('token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/organizer/${user?.email}`);

            return res?.data?.organizer
        }
    })
    return [isOrganizer, isOrganizerPanding]
};

export default useOrganizers;
