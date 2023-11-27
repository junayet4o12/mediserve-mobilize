// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";
import { Link } from "react-router-dom";
import { GrUpdate } from "react-icons/gr";
import { RiChatDeleteFill } from "react-icons/ri";
import DataTable from "react-data-table-component";

const ManageRegistgeredCampTable = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: registeredCamp = [], isLoading, refetch } = useQuery({
        queryKey: ['registeredCamps', user],
        enabled: !!user?.email && !!localStorage.getItem('token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/registrationcamps`)
            return res?.data
        }
    })
    const timeForm = (time) => {
        return new Date(time)
    }
    const handleDelete = (id) => {
        console.log(id);
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
            selector: row => <p className="font-medium text-[11px]">{timeForm(row?.campInfo?.DateAndTime?.date).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })} ({timeForm(row?.campInfo?.DateAndTime?.startTime).toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true })} to {timeForm(row?.DateAndTime?.campInfo?.endTime).toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true })})`</p>
        },
        {
            name: 'Vanue',
            selector: row => <p className="font-medium">{row?.campInfo?.campvenueLocation?.placeName}</p>
        },

        {
            name: 'Camp Fees',
            selector: row => <p className="font-medium">{row?.campInfo?.campFee}</p>
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
            name: 'Action',
            cell: row => <div className="flex  gap-2 ">
                
            {row?.confirmationStatus ?  <button onClick={() => handleDelete(row?._id)} title="Delete Camp" className="btn btn-neutral bg-black border-none text-white text-lg font-bold deletebtn"><RiChatDeleteFill></RiChatDeleteFill></button> : ''}
            </div>
        },
    ]
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <DataTable
                columns={columns}
                data={registeredCamp}
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
    );
};

export default ManageRegistgeredCampTable;