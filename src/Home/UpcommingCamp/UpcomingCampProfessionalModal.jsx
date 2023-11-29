/* eslint-disable react/prop-types */
// import React from 'react';

import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpcomingCampProfessionalModal = ({ camp, id, handleClose, open }) => {
    const { user } = useAuth();
    const [writtenname, setwrittenName] = useState('')
    const [writtencontactnum, setwrittencontactnum] = useState('')
    const [writtenemail, setwrittenemail] = useState('')
    const [writtenspecialization, setwrittenspecialization] = useState('')
    const [error, seterror] = useState('')
    const [openchild, setopenchild] = useState(false)
    const [registerInformation, setregisterInformation] = useState({})
    const axiosSecure = useAxiosSecure()
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',

        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,

    };
    const handlename = e => {
        setwrittenName(e.target.value)
    }
    const handlecontactnum = e => {
        setwrittencontactnum(e.target.value)
    }
    const handleemail = e => {
        setwrittenemail(e.target.value)
    }
    const handlespecialization = e => {
        setwrittenspecialization(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()


        seterror('')
        const form = e.target;


        const professionalName = form.name.value;

        const number = form.number.value;
        const email = form.email.value;
        const specialization = form.specialization.value;
        if (number.length !== 11) {
            return seterror('Your Contact Number Must be 11 charecters')
        }


        const Information = {
            professionalName,
            specialization,
            contactInformation: {
                number,
                email
            },
            organizerEmail: camp?.organizerEmail,
            campId: id,
            campName: camp?.campName,
            queryNumber: camp?.queryNumber,
            campInfo: {
                campFee: camp?.campFees,
                campSpecializedService: camp?.specializedService,
                campHealthcareExpert: camp?.healthcareExpert,
                campTargetAudience: camp?.targetAudience,
                campvenueLocation: camp?.venueLocation,
                campImage: camp?.image,

                DateAndTime: camp?.DateAndTime
            },
            professionalEmail: user?.email,
            userName: user?.displayName,
        }
        setregisterInformation(Information)
        setopenchild(true)

    }
    const handleConfirm = () => {
        // console.log(registerInformation);
        setopenchild(false)
        axiosSecure.post('/professionallist', registerInformation)
            .then(res => {
                console.log(res?.data);
                // {result,upcomingupdate}
                if (res?.data?.result?.insertedId && res?.data?.upcomingupdate?.modifiedCount>0) {
                    setwrittenName('')
                    setwrittenemail('')
                    setwrittencontactnum('')
                    setwrittenspecialization('')
                    handleClose()

                    Swal.fire({
                        icon: "success",
                        title: "Your Data has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
        console.log(registerInformation);



    }
    const handleAllClose = () => {
        handleClose()
        setwrittenName('')
        setwrittenemail('')
        setwrittencontactnum('')
        setwrittenspecialization('')
    }
    return (
        <div>
            <Modal
                sx={{ display: 'flex' }}
                keepMounted
                open={open}
                // onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <div className="bg-blue-50  mx-auto my-auto p-5 overflow-hidden  max-h-[90vh] overflow-y-scroll max-w-[700px]">
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold text-center py-2">Registration Form</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-x-5">
                            <div className="  ">
                                <label className="label">
                                    <span className="label-text">Your Name</span>
                                </label>
                                <input onChange={handlename} value={writtenname} required name="name" type="text" placeholder="Name" className="input input-bordered w-full sm:w-[320px]" />
                            </div>
                            <div className="form-control  w-full sm:w-[320px]">
                                <label className="label">
                                    <span className="label-text">Your Contact Number</span>
                                </label>
                                <input onChange={handlecontactnum} value={writtencontactnum} required name="number" type="number" placeholder="Number" className="input input-bordered w-full sm:w-[320px]" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-x-5">
                            <div className="  ">
                                <label className="label">
                                    <span className="label-text">Your Email Address</span>
                                </label>
                                <input onChange={handleemail} value={writtenemail} required name="email" type="email" placeholder="Eamil" className="input input-bordered w-full sm:w-[320px]" />
                            </div>
                            <div className="form-control  w-full sm:w-[320px]">
                                <label className="label">
                                    <span className="label-text">Specialization</span>
                                </label>
                                <input onChange={handlespecialization} value={writtenspecialization} required name="specialization" type="text" placeholder="Specialization" className="input input-bordered w-full sm:w-[320px]" />
                            </div>
                        </div>
                        <p className="text-sm font-medium text-red-500">
                            {error}
                        </p>
                        <div className="flex gap-7 flex-wrap pt-5">
                            <button type="submit" className="btn btn-primary">Register</button>
                            <p className="btn btn-neutral" onClick={handleAllClose}>close</p>
                        </div>
                    </form>
                </div>


            </Modal>
            <Modal
                open={openchild}

                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style }}>
                    <div className="p-2 w-[250px] sm:w-[300px] ">
                        <h2 className="text-2xl font-bold mb-2" id="child-modal-title">Are You sure?</h2>
                        <p className="text-base font-medium mb-4" id="child-modal-description">
                            You can check your infromation twice
                        </p>
                        <Button className="login" sx={{ background: 'blue', color: 'white', mr: '10px', p: '10px', fontWeight: 'bold', mb: '10px', '&:hover': { background: '#003366' }, }} onClick={handleConfirm}>Confirm !!</Button>
                        <Button className="login" onClick={() => setopenchild(false)} sx={{ background: 'red', color: 'white', mr: '10px', p: '10px', fontWeight: 'bold', mb: '10px', '&:hover': { background: '#E53E3E' }, }} >Check info</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default UpcomingCampProfessionalModal;