import axios from "axios";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseconfig";
 
// import React from 'react';
const axiosSecure = axios.create({
    baseURL: 'https://mediserve-mobilize-backend.vercel.app'
})
const useAxiosSecure = () => {
    const navigate = useNavigate()
    axiosSecure.interceptors.request.use((res) => {
        const token = localStorage.getItem('token')
        res.headers.authorization = `bearer ${token}`
        // console.log(config);
        return res
    }, (err) => {
        Promise.reject(err)
    })
    axiosSecure.interceptors.response.use((res) => {
        return res;
    }, (err) => {
        const status = err.response.status;
        console.log(status);
        if (status === 401 || status === 403)
            signOut(auth)
        navigate('/login')
        return Promise.reject(err);
    });
    return axiosSecure
};

export default useAxiosSecure;