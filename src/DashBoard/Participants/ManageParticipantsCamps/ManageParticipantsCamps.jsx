// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";
import Title from "../../../Components/Title/Title";
import DataTable from "react-data-table-component";
import { FaCcAmazonPay } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import './ManageParticipantsCamps.css'
import Swal from "sweetalert2";
const ManageParticipantsCamps = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: yourRegisterdCamps = [], isLoading } = useQuery({
        queryKey: ['manageyourregisteredcamps', user],
        enabled: !!user?.email && !!localStorage.getItem('token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/singleregisteredcamp/${user?.email}`)
            return res?.data
        }
    })
    console.log(yourRegisterdCamps, user?.email);
    if (isLoading) {
        return <Loading></Loading>
    }
    const handleDelete = (id1, id2) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('registered Camp Id', id1, 'campid', id2);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your Registered Camp has been deleted.",
                    icon: "success"
                });
            }
        });
    }
    const timeForm = (time) => {
        return new Date(time)
    }
    const columns = [

        {
            name: 'Camp Image',
            selector: row => <img className="max-w-[120px] max-h-[120px] rounded-lg m-2" src={row?.campInfo?.campImage} alt="" />
        },
        {
            name: 'Camp Name',
            selector: row => <p className="font-medium">{row?.campInfo?.campName}</p>
        },

        {
            name: 'Shedule',
            selector: row => <p className="font-medium text-[11px]">{timeForm(row?.campInfo?.DateAndTime?.date).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })} ({timeForm(row?.campInfo.DateAndTime?.startTime).toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true })} to {timeForm(row?.campInfo.DateAndTime?.endTime).toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true })})`</p>
        },
        {
            name: 'Venue',
            selector: row => <p className="font-medium">{row?.campInfo?.campvenueLocation?.placeName}</p>
        },
        {
            name: 'Camp Fees',
            selector: row => <p className="font-medium">${row?.campInfo?.campFee}</p>
        },
        {
            name: 'Payment Status',
            selector: row => <p className="font-medium">{row?.paymentStatus || 'Unpaid'}</p>
        },
        {
            name: 'Confirmation Status',
            selector: row => <p className="font-medium">{row?.confirmationStatus || 'Pending'}</p>
        },
        {
            name: 'Pay',
            cell: row => <div className=" ">

                {
                    row?.paymentStatus ? <p className="font-bold ">Already Paid</p> : <button disabled={row?.paymentStatus} className=" text-base font-bold btn  border-none  bg-[#4CAF50] text-white   paybtn" title="Pay for camps">Pay</button>
                }
            </div>
        },
        {
            name: 'Cancel',
            cell: row => <div className="flex  gap-4 justify-center items-center ">


                <button onClick={() => handleDelete(row?._id, row?.campInfo?.campId)} disabled={row?.paymentStatus} className=" text-base font-bold btn   bg-[#bc0f0f]   cancelbtn shadow-none text-white" title="Cancel Registration ">Cancel</button>

            </div>
        }
    ]
    return (
        <div>
            <div className="mt-10">
                <Title title={'Manage Camps'} desc={'Registered By You'}></Title>
                <DataTable
                    columns={columns}
                    data={yourRegisterdCamps}
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
        </div>
    );
};

export default ManageParticipantsCamps;