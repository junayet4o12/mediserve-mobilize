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
            name: 'Participants Details',
            cell: row => <div className="flex  gap-2 ">
                <Link to={`/dashboard/upcomingparticipantsDetails/${row?.queryNumber}`}>
                    <button title="See participants details" className="btn btn-neutral bg-blue-400 border-none text-white text-lg font-bold updatebtn"><BiSolidUserDetail></BiSolidUserDetail></button>
                </Link>

            </div>
        },
        {
            name: 'Professionals Details',
            cell: row => <div className="flex  gap-2 ">
                <Link to={`/dashboard/upcomingprofessionaldetails/${row?.queryNumber}`}>
                    <button title="See Professionals details" className="btn btn-neutral bg-red-400 border-none text-white text-lg font-bold login"><SettingsAccessibilityTwoToneIcon></SettingsAccessibilityTwoToneIcon></button>
                </Link>

            </div>
        },
    ]
    return (
        <div>
            <Title title={'Your Upcoming camp'} desc={'Manage Your upcoming camp'}></Title>
            <div>
                <DataTable
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