// import React from 'react';
import { RiChatDeleteFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading";
import DataTable from "react-data-table-component";
import Title from "../../../Components/Title/Title";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const UpcomingProfessionalsDetails = () => {
    const { user } = useAuth()
    const { query } = useParams();
    const axiosSecure = useAxiosSecure()
    const { data: professionalupcomingCamp, isLoading: professionalupcomingisLoading, refetch: professionalupcomingrefetch } = useQuery({
        queryKey: [`professionalupcomingCamp ${query}`, user?.email],
        enabled: !!user?.email && !!localStorage.getItem('token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/professionallist/${query}`)
            return res?.data
        }

    })
    if (professionalupcomingisLoading) {
        return <Loading></Loading>
    }
    const isConfirm = professionalupcomingCamp.find(camping => camping?.confirmation === true)
    const handleAccept = (camp) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Accept!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/professionallistupdate/${camp?._id}`, {
                    professionalName: camp?.professionalName,
                    campid: camp?.campId
                })
                    .then(res => {
                        console.log(res?.data);
                        if (res?.data?.updateparticipants?.modifiedCount > 0 && res?.data?.updateparticipants2?.modifiedCount > 0) {
                            professionalupcomingrefetch()
                            Swal.fire({
                                title: "Accepted!",
                                text: "The Professional has accepted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }
    const columns = [



        {
            name: 'Professional Name',
            selector: row => <p className="font-medium"><span className="font-medium mr-3">{professionalupcomingCamp.indexOf(row) + 1}</span>{row?.professionalName}</p>
        },
        {
            name: 'Specialization',
            selector: row => <p className="font-medium">{row?.specialization}</p>
        },
        {
            name: 'Contact Number',
            selector: row => <p className="font-medium">{row?.contactInformation?.number}</p>
        },
        {
            name: 'Email address',
            selector: row => <p className="font-medium">{row?.contactInformation?.email}</p>
        },
        {
            name: 'Confirmation',
            selector: row => <p className="font-medium">{isConfirm ? (row?.confirmation? 'Confirmed': 'Rejected') : 'Pending'}</p>
        },
        {
            name: 'Accept Request',
            cell: row => <button disabled={isConfirm} onClick={() => handleAccept(row)} className="btn my-2 bg-blue-500 text-sm font-bold text-white login">{isConfirm ? (row?.confirmation? 'Accepted': 'Rejected') : 'Accept'}</button>
        }


    ]
    return (
        <div>
            <Helmet>
                <title>Mediserve Mobilize | Upcoming Professional Details</title>
            </Helmet>
            <Title title={'Professionals Details'} desc={`For Upcoming camp.`}></Title>
            <DataTable
            pagination
                columns={columns}
                data={professionalupcomingCamp}
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

export default UpcomingProfessionalsDetails;