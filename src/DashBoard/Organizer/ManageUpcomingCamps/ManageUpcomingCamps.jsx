// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import Title from "../../../Components/Title/Title";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";
import SettingsAccessibilityTwoToneIcon from '@mui/icons-material/SettingsAccessibilityTwoTone';
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdPublish } from "react-icons/md";
import Swal from "sweetalert2";
import { GrUpdate } from "react-icons/gr";
import { TbHttpDelete } from "react-icons/tb";
import { Helmet } from "react-helmet-async";
const ManageUpcomingCamps = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
    const { data: upcomingCamp, isLoading: upcomingisLoading, refetch: upcomingrefetch } = useQuery({
        queryKey: ['mangeupcomingCamp', user?.email],
        enabled: !!user?.email && !!localStorage.getItem('token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/manageupcommingcamps/${user?.email}`)
            return res?.data
        }

    })


    if (upcomingisLoading) {
        return <Loading></Loading>
    }
    console.log(upcomingCamp);
    const timeForm = (time) => {
        return new Date(time)
    }
    const handlePublish = (row) => {
        if (!(row?.professionals > 0 && row?.interestedParticipators > 2)) {
            return Swal.fire({
                title: 'Error!',
                text: 'Interested Professionals count must be atleast 1 and interested participatos count atleast 3',
                icon: 'error',
                confirmButtonText: 'Ok, Got it'
            })
        }
        axiosSecure.get(`/participantlist/${row?.queryNumber}`)
            .then(res => {
                console.log(res?.data.length);
                const data = res?.data;
                const amountOfRegister = data?.filter(datum => datum?.register === true)
                console.log(amountOfRegister);

                if (data.length !== amountOfRegister.length) {
                    return Swal.fire({
                        title: 'Error!',
                        text: 'Please Register All the participant request',
                        icon: 'error',
                        confirmButtonText: 'Ok, Got it'
                    })
                }
                else {
                    console.log(row);
                    Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, Move to Camp!"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            axiosSecure.post('/campsfromupcoming', row)
                                .then(res => {
                                    console.log(res?.data)
                                    if (res?.data?.result?.insertedId && (res?.data?.deleteupcoming?.deletedCount > 0) && res?.data?.result2?.insertedId) {
                                        upcomingrefetch()
                                        Swal.fire({
                                            icon: "success",
                                            title: "Upcoming Camp has moved to camp section",
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                    }
                                })
                        }
                    });


                }
            })

    }

    const handleDelete = (camp) => {
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
                axiosSecure.put(`/deleteupcoming/${camp?._id}`, camp)
                    .then(res => {
                        console.log(res?.data);
                        // {result, result2, result3, result4, result5}
                        if (res?.data?.result?.deletedCount > 0 || res?.data?.result2?.deletedCount > 0 || res?.data?.result3?.deletedCount > 0 || res?.data?.result4?.deletedCount > 0 || res?.data?.result5?.deletedCount > 0) {
                            console.log(camp);
                            upcomingrefetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your camp has been deleted.",
                                icon: "success"
                            });
                        }
                    })


            }
        });
    }
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
            name: 'Venue',
            selector: row => <p className="font-medium">{row?.venueLocation?.placeName}</p>
        },
        {
            name: 'Participants',
            selector: row => <p className="font-medium">{row?.participators}</p>
        },
        {
            name: 'Interester Participant',
            selector: row => <p className="font-medium">{row?.interestedParticipators || 0}</p>
        },

        {
            name: 'Interested Professionals',
            selector: row => <p className="font-medium">{row?.professionals}</p>
        },

        {
            name: 'Professionals Details',
            cell: row => <div className="flex  gap-2 ">
                <Link to={`/dashboard/upcomingprofessionaldetails/${row?.queryNumber}`}>
                    <button title="See Professionals details" className="btn btn-neutral bg-red-400 border-none text-white text-lg font-bold login"><SettingsAccessibilityTwoToneIcon></SettingsAccessibilityTwoToneIcon></button>
                </Link>

            </div>
        },
        {
            name: 'Participants Details',
            cell: row => <div className="flex  gap-2 ">
                <Link to={`/dashboard/upcomingparticipantsDetails/${row?.queryNumber}`}>
                    <button title="See participants details" className="btn btn-neutral bg-blue-400 border-none text-white text-lg font-bold updatebtn"><BiSolidUserDetail></BiSolidUserDetail></button>
                </Link>

            </div>
        },
        {
            name: 'Participants Details',
            cell: row => <div className="flex  gap-2 ">

                <button onClick={() => handlePublish(row)} title="publish button will be enable after interester participant count minimum 3 and professional count minimum 1" className="btn btn-neutral bg-orange-500 border-none text-white text-xl font-bold logout"><MdPublish></MdPublish></button>


            </div>
        },
        {
            name: 'Update Camp',
            cell: row => <div className="flex  gap-2 ">

                <Link to={`/dashboard/update-upcoming-camp/${row?._id}`}>
                    <button title="Update Upcoming Camp" className="btn btn-neutral bg-green-400 border-none text-white text-xl font-bold login"><GrUpdate></GrUpdate></button>
                </Link>


            </div>
        },
        {
            name: 'Delete Camp',
            cell: row => <div className="flex  gap-2 ">


                <button onClick={() => handleDelete(row)} title="Delete Upcoming Camp" className="btn btn-neutral bg-red-400 border-none text-white text-2xl font-bold logout"><TbHttpDelete></TbHttpDelete></button>



            </div>
        },

    ]
    return (
        <div>
            <Helmet>
                <title>Mediserve Mobilize | Manage Upcoming Camp</title>
            </Helmet>
            <Title title={'Your Upcoming camp'} desc={'Manage Your upcoming camp'}></Title>
            <div>
                <DataTable
                pagination
                    columns={columns}
                    data={upcomingCamp}
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
            {/* <Title title={'Your Upcoming camp'} desc={'whose registered by participant'}></Title> */}
            {/* participant camp table  */}

            {/* <Title title={'Your Upcoming camp'} desc={'whose booked by professional'}></Title> */}

        </div>
    );
};

export default ManageUpcomingCamps;