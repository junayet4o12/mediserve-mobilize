/* eslint-disable react/prop-types */
// import React from 'react';

import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Modal, Rating, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const FeedbackModal = ({ handleClose, camp, open }) => {
    const { user } = useAuth()
    const [value, setValue] = useState(0);
    const [err, seterr] = useState('')
    // console.log(camp);
    const imgHostingKey = import.meta.env.VITE_IMG_HOSTING_KEY;
    const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`
    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm()
    const axiosSecure = useAxiosSecure()
    const handlesubmit = async (e) => {

        e.preventDefault()
        seterr('')
        const form = e.target;

        const rating = parseFloat(form?.rating?.value);
        // console.log(rating);
        if (!rating) {
            return seterr('Please Give rating');
        }
        const feedback = form?.feedback.value;
        const image = { image: form.testimonial.files[0] };
        // console.log(rating, image, feedback);
        const res = await axios.post(imgHostingApi, image, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        const imgurl = res?.data?.data?.display_url
        const feedbackData = {
            campName: camp?.registeredCampdetails?.camp?.campInfo?.campName,
            rating,
            feedback,
            participant: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
            organizerEmail: camp?.registeredCampdetails?.camp?.campInfo?.organizerEmail,
            time: Date.parse(new Date()),
            reviewimg: imgurl

        }
        axiosSecure.post('/addfeedback', feedbackData)
            .then(res => {
                console.log(res?.data);
                if (res?.data?.insertedId) {
                    setValue(0);
                    seterr('')
                    handleClose()
                    Swal.fire({
                        icon: "success",
                        title: "Your feedbacke has posted",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
        console.log(feedbackData);


    }
    const handleallclose= ()=> {
        setValue(0);
        seterr('')
        handleClose()
    }
    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <form onSubmit={handlesubmit} className="bg-white w-[80%] sm:w-[650px] h-[70vh] sm:h-max overflow-y-scroll sm:overflow-visible m-4 px-4 py-4 rounded-lg">
                    <div className=" grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-5">
                        <div className="pt-5 sm:col-span-2">
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                                Update Your Profile
                            </Typography>
                        </div>
                        <div>
                            <p className="font-bold mb-3 ">Give Rating</p>
                            <Rating
                                sx={{ color: '#4299e1' }}
                                required
                                name="rating"
                                value={value}
                                onChange={(event, newValue) => {
                                    console.log(newValue);
                                    setValue(newValue);
                                }}
                            />
                        </div>
                        <div>
                            <input type="file"

                                required name='testimonial' className="px-4 py-4 border  w-full border-transparent border-b-black h-16" />
                        </div>
                        <div className="sm:col-span-2">
                            <h2 className="font-bold p-2">Write Feedback</h2>
                            <textarea
                                required className="border w-full h-40 sm:h-32 rounded-lg p-2" name="feedback" placeholder="Write...." />
                        </div>
                    </div>
                    <p className="text-red-500 font-bold text-sm">{err}</p>
                    <div className="text-center flex  items-center gap-10">
                        <button className="btn btn-neutral bg-blue-500 border-none rounded-sm profileUpdatebtn mt-5">Review</button>
                        <button onClick={handleallclose} className="btn btn-neutral bg-red-500 border-none rounded-sm closebtn mt-5">Close</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default FeedbackModal;