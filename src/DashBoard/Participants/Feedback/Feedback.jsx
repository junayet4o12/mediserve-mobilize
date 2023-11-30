// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import Title from "../../../Components/Title/Title";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";
import DataTable from "react-data-table-component";
import { useState } from "react";
import FeedbackModal from "./FeedbackModal";
import { Helmet } from "react-helmet-async";

const Feedback = () => {
    const [camp, setcamp] = useState({})
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { data: paymenthistory = [], isLoading } = useQuery({
        queryKey: ['give feedback', user],
        enabled: !!user?.email && !!localStorage.getItem('token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/paymentsbyemail/${user?.email}`)
            return res?.data;
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    const timeForm = (time) => {
        return new Date(time)
    }
    const handlereview = (campdetails) => {
        setcamp(campdetails)
        handleOpen()
    }
    const columns = [

        {
            name: 'Camp Image',
            selector: row => <img className="max-w-[120px] max-h-[120px] rounded-lg m-2" src={row?.registeredCampdetails?.camp?.campInfo?.campImage} alt="" />
        },

        {
            name: 'Camp Name',
            selector: row => <p className="font-medium">{row?.registeredCampdetails?.camp?.campInfo?.campName}</p>
        },
        {
            name: 'Shedule',
            selector: row => <p className="font-medium text-[11px]">{timeForm(row?.registeredCampdetails?.camp?.campInfo?.DateAndTime?.date).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })} ({timeForm(row?.registeredCampdetails?.camp?.campInfo?.DateAndTime?.startTime).toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true })} to {timeForm(row?.registeredCampdetails?.camp?.campInfo?.DateAndTime?.endTime).toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true })})`</p>
        },
        {
            name: 'Camp Fees',
            selector: row => <p className="font-medium">${row?.registeredCampdetails?.camp?.campInfo?.campFee}</p>
        },
        {
            name: 'Payment Status',
            selector: row => <p className="font-medium">{row?.paymentStatus || 'Not Given'}</p>
        },




        {
            name: 'Vanue',
            selector: row => <p className="font-medium">{row?.registeredCampdetails?.camp?.campInfo?.campvenueLocation?.placeName}</p>
        },
        {
            name: 'Confirmation Status',
            selector: row => <p className="font-medium">{row?.confirmationStatus || 'Not Given'}</p>
        },
        {
            name: 'Give Feedback',
            cell: row => <button onClick={() => handlereview(row)} className="btn btn-neutral  bg-blue-400 text-white font-bold border-none">Review</button>
        },




    ]
    return (
        <div>
            <Helmet>
                <title>Mediserve Mobilize | Feedback</title>
            </Helmet>
            <Title title={'Feedback'} desc={'Give feedback to your paid camp'}></Title>
            <div>
                <DataTable
                pagination
                    columns={columns}
                    data={paymenthistory}
                    selectableRowsHighlight
                    highlightOnHover

                    customStyles={{


                        rows: {

                        },
                        headCells: {
                            style: {
                                paddingLeft: '8px',
                                paddingRight: '8px',
                                background: '#4299e1',
                                color: 'white',
                                borderRadius: ''
                            },
                        },
                        cells: {
                            style: {
                                paddingLeft: '10px',
                                paddingRight: '10px',
                            },
                        },
                        table: {
                            style: {
                                borderRadius: '8px',
                                overflow: 'hidden'
                            }
                        }
                    }}
                />
            </div>
            <div>
                <FeedbackModal handleClose={handleClose} open={open} camp={camp}></FeedbackModal>
            </div>
        </div>
    );
};

export default Feedback;