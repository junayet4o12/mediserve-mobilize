// import React from 'react';

import { TextField } from "@mui/material";
import Title from "../Title/Title";
import emailjs from '@emailjs/browser';
import { useRef, useState } from "react";
import Swal from "sweetalert2";
const ContactUs = () => {
    const refForm = useRef()
    const [errorsucc, seterrofsecc] = useState('')
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_bmgwfqu', 'template_i1lz0tg', refForm.current, 'DuxJiAi_UCS8B-CFC')
            .then((result) => {
                console.log(result.text);
                Swal.fire({
                    icon: "success",
                    title: "Successfully Email has gone",
                    showConfirmButton: false,
                    timer: 1500
                });
                refForm.current.reset()
                seterrofsecc(<p className="text-sm font-bold text-green-500">Email has sent successfully</p>)
            }, (error) => {
                console.log(error.text);
                seterrofsecc(<p className="text-sm font-bold text-green-500">Something went Wrong!!!</p>)
            });
    };
    return (
        <div>
            <div className="py-7 bg-blue-50">
                <Title title={'Contact us'} desc={'You Can Contact with us with form'}></Title>
                <form ref={refForm} onSubmit={sendEmail} className="text-black">
                    <div className="flex flex-wrap  justify-center items-center gap-x-4 p-4 gap-y-7">
                        <div className="w-full md:w-[360px] lg:w-[480px] flex justify-center items-center">
                            <div className="w-full bg-gray-300 px-1 border border-b-black rounded">
                                <TextField type="name" required name="name" sx={{ width: '100%' }} id="standard-basic" label="Enter Your Name" variant="standard" />
                            </div>
                        </div>
                        <div className="w-full md:w-[360px] lg:w-[480px] flex justify-center items-center">
                            <div className="w-full bg-gray-300 px-1 border border-b-black rounded">
                                <TextField type="email" required name="email" sx={{ width: '100%' }} id="standard-basic" label="Enter Your Email" variant="standard" />
                            </div>
                        </div>
                        <div className="w-full md:w-[360px] lg:w-[480px] flex justify-center items-center">
                            <div className="w-full bg-gray-300 px-1 border border-b-black rounded">
                                <TextField type="number" required name="number" sx={{ width: '100%' }} id="standard-basic" label="Enter Your Number" variant="standard" />
                            </div>
                        </div>
                        <div className="w-full md:w-[360px] lg:w-[480px] flex justify-center items-center">
                            <div className="w-full bg-gray-300 px-1 border border-b-black rounded">
                                <TextField required name="profession" sx={{ width: '100%' }} id="standard-basic" label="Enter Your Profession" variant="standard" />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <textarea name="experience" className=" border-[1.5px]  rounded-lg h-[200px] w-[90%] sm:w-[85%] md:w-[80%] lg:w-[70%] px-4 pt-4 text-sm font-semibold bg-gray-200" placeholder="Write your experience...."></textarea>
                    </div>
                    <div className="mb-7 mx-auto w-[90%] sm:w-[85%] md:w-[80%] lg:w-[70%] px-4">
                        {errorsucc}
                    </div>
                    <div className="text-center">
                        <button className="btn rounded-lg btn-neutral bg-blue-400  text-white font-bold text-sm border-none login">Send Email</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;