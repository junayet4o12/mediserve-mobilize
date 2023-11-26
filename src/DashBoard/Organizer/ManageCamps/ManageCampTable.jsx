/* eslint-disable react/prop-types */
// import React from 'react';

import DataTable from "react-data-table-component";
import { GrUpdate } from "react-icons/gr";
import { RiChatDeleteFill } from "react-icons/ri";
import './ManageCamps.css'
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const ManageCampTable = ({ yourcamps,refetch }) => {
    const axiosSecure = useAxiosSecure()
    const timeForm = (time) => {
        return new Date(time)
    }
    const handleDelete = (id) => {
        console.log(id);
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
                axiosSecure.delete(`/delete-camp/${id}`)
                    .then(res => {
                        console.log(res?.data)
                        if (res?.data?.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Camp has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }

    // + 31536000000

    const columns = [

        {
            name: 'Camp Image',
            selector: row => <img className="max-w-[120px] max-h-[120px] rounded-lg m-2" src={row?.image} alt="" />
        },

        {
            name: 'Camp Name',
            selector: row => <p className="font-medium">{row?.campName}</p>
        },
        {
            name: 'Shedule',
            selector: row => <p className="font-medium text-[11px]">{timeForm(row?.DateAndTime?.date).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })} ({timeForm(row?.DateAndTime?.startTime).toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true })} to {timeForm(row?.DateAndTime?.endTime).toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true })})`</p>
        },
        {
            name: 'Target Audience',
            selector: row => <p className="font-medium">{row?.targetAudience}</p>
        },
        {
            name: 'Location',
            selector: row => <p className="font-medium">{row?.venueLocation?.placeName}</p>
        },
        {
            name: 'Specialized Service',
            selector: row => <p className="font-medium">{row?.specializedService}</p>
        },
        {
            name: 'Healthcare Expert',
            selector: row => <p className="font-medium">{row?.healthcareExpert}</p>
        },

        {
            name: 'Participators',
            selector: row => <p className="font-medium">{row?.participators}</p>
        },
        {
            name: 'Action',
            cell: row => <div className="flex  gap-2 ">
                <Link to={`/dashboard/update-camp/${row?._id}`}>
                    <button title="Update Camp" className="btn btn-neutral bg-blue-400 border-none text-white text-lg font-bold updatebtn"><GrUpdate></GrUpdate></button>
                </Link>
                <button onClick={() => handleDelete(row?._id)} title="Delete Camp" className="btn btn-neutral bg-black border-none text-white text-lg font-bold deletebtn"><RiChatDeleteFill></RiChatDeleteFill></button>
            </div>
        },
    ]
    return (
        <div>
            <div className="mt-10">
                <DataTable
                    columns={columns}
                    data={yourcamps}
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

export default ManageCampTable;