// import React from 'react';

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../firebase/authProvider/AuthProviders";
import useAxiosPublic from "./useAxiosPublic";
import Swal from "sweetalert2";

const useGoogleLogin = () => {
    const navigate = useNavigate()
    const { user, googleLogIn } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic();
    const handlegooglelogin = (loc) => {
        
        googleLogIn()
            .then(res => {
                console.log(res.user);
                const userInfo = {
                    email: res?.user?.email,
                    name: res?.user?.displayName,
                    contactNumber: '',
                    age: '',
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res?.data);
                        Swal.fire({
                            title: "Logged in Successfully..",
                            showClass: {
                                popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                            },
                            hideClass: {
                                popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                            }
                        });
                        navigate( '/')
                    })


            })
            .catch(err => {
                console.log(err);
            })
    }
    return handlegooglelogin
};

export default useGoogleLogin;