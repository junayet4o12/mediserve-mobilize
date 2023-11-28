import axios from "axios";

// import React from 'react';
const axiosPublic = axios.create({
    baseURL: 'https://mediserve-mobilize-backend.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;