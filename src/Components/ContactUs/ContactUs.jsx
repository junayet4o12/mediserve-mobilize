// import React from 'react';

import { TextField } from "@mui/material";
import Title from "../Title/Title";

const ContactUs = () => {
    return (
        <div>
            <div className="py-7 bg-blue-50">
                <Title title={'Contact us'} desc={'You Can Contact with us with form'}></Title>
                <div className="text-black">
                    <div className="flex flex-wrap  justify-center items-center gap-x-4 p-4 gap-y-7">
                        <div className="w-full md:w-[360px] lg:w-[480px] flex justify-center items-center">
                            <div className="w-full bg-gray-300 px-1 border border-b-black rounded">
                                <TextField sx={{ width: '100%'}} id="standard-basic" label="Enter Your Name" variant="standard" />
                            </div>
                        </div>
                        <div className="w-full md:w-[360px] lg:w-[480px] flex justify-center items-center">
                        <div className="w-full bg-gray-300 px-1 border border-b-black rounded">
                                <TextField sx={{ width: '100%'}} id="standard-basic" label="Enter Your Email" variant="standard" />
                            </div>
                        </div>
                        <div className="w-full md:w-[360px] lg:w-[480px] flex justify-center items-center">
                        <div className="w-full bg-gray-300 px-1 border border-b-black rounded">
                                <TextField sx={{ width: '100%'}} id="standard-basic" label="Enter Your Number" variant="standard" />
                            </div>
                        </div>
                        <div className="w-full md:w-[360px] lg:w-[480px] flex justify-center items-center">
                        <div className="w-full bg-gray-300 px-1 border border-b-black rounded">
                                <TextField sx={{ width: '100%'}} id="standard-basic" label="Enter Your Profession" variant="standard" />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mb-7">
                        <textarea className=" border-[1.5px]  rounded-lg h-[200px] w-[90%] sm:w-[85%] md:w-[80%] lg:w-[70%] p-4 text-sm font-semibold bg-gray-200" placeholder="Write your experience...."></textarea>
                    </div>
                    <div className="text-center">
                        <button className="btn rounded-lg btn-neutral bg-blue-400  text-white font-bold text-sm border-none login">send email</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;