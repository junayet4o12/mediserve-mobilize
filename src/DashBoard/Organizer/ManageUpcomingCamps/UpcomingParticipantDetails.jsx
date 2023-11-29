// import React from 'react';

import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Components/Loading";
import { useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import Title from '../../../Components/Title/Title'
import Swal from "sweetalert2";
const UpcomingParticipantDetails = () => {
    const { user } = useAuth()
    const { query } = useParams();
    console.log(query);
    const axiosSecure = useAxiosSecure()
    const { data: userupcomingCamp, isLoading: userupcominisLoading, refetch: userupcomingrefetch } = useQuery({
        queryKey: [`userupcomingCamp ${query}`, user?.email],
        enabled: !!user?.email && !!localStorage.getItem('token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/participantlist/${query}`)
            return res?.data
        }

    })
    if (userupcominisLoading) {
        return <Loading></Loading>
    }
    console.log(userupcomingCamp);
    const handleRegister = (camp) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Register!"
        }).then((result) => {

            if (result.isConfirmed) {
                console.log(camp);
                const newCamp = {
                    oldId: camp?._id,
                    registerName: camp?.registerName,
                    age: camp?.age,
                    contactInformation: camp?.contactInformation,
                    gender: camp?.gender,
                    address: camp?.address,
                    healthInformation: camp?.healthInformation,
                    queryNumber: camp?.queryNumber,
                    campInfo: {
                        campId: camp?.campId,
                        campName: camp?.campName,
                        campFee: camp?.campInfo?.campFee,
                        campSpecializedService: camp?.campInfo?.campSpecializedService,
                        campHealthcareExpert: camp?.campInfo?.campHealthcareExpert,
                        campTargetAudience: camp?.campInfo?.campTargetAudience,
                        campvenueLocation: camp?.campInfo?.campvenueLocation,
                        campImage: camp?.campInfo?.campImage,
                        organizerEmail: camp?.organizerEmai,
                        DateAndTime: camp?.campInfo?.DateAndTime

                    },
                    registerEmail: camp?.registerEmail,
                    userName: camp?.userName
                }
                console.log(newCamp);
                axiosSecure.post('/registrationcamps', newCamp)
                    .then(res => {
                        console.log(res?.data);
                        if (res?.data?.insertedId) {
                            axiosSecure.put(`/participantlist/${camp?._id}`)
                                .then(res => {
                                    console.log(res?.data);
                                    if (res?.data?.modifiedCount > 0) {
                                        userupcomingrefetch()
                                        Swal.fire({
                                            title: "Registered!",
                                            text: "Registration has completed successfully.",
                                            icon: "success"
                                        });
                                    }
                                })

                        }
                    })

            }
        });
    }
    const columns = [



        {
            name: 'Participans Name',
            selector: row => <p className="font-medium"> <span className="font-medium mr-3">{userupcomingCamp.indexOf(row) + 1}.</span> {row?.registerName}</p>
        },
        {
            name: 'Age',
            selector: row => <p className="font-medium">{row?.age} Years</p>
        },
        {
            name: 'Contact Number',
            selector: row => <p className="font-medium">{row?.contactInformation?.number}</p>
        },
        {
            name: 'Emergency Contact Number',
            selector: row => <p className="font-medium">{row?.contactInformation?.emergencyNumber}</p>
        },
        {
            name: 'Gender',
            selector: row => <p className="font-medium">{row?.gender}</p>
        },
        {
            name: 'Fever',
            selector: row => <p className="font-medium">{row?.healthInformation?.fever}</p>
        },
        {
            name: 'Headeche',
            selector: row => <p className="font-medium">{row?.healthInformation?.headeche}</p>
        },
        {
            name: 'Feel weak',
            selector: row => <p className="font-medium">{row?.healthInformation?.weak}</p>
        },
        {
            name: 'Register camp',
            cell: row => <button disabled={row?.register} onClick={() => handleRegister(row)} title={`Register camp for ${row?.registerName}`} className="bg-blue-500 text-white btn login my-2">{row?.register ? 'Registered' : 'Register'}</button>
        },


    ]
    return (
        <div>
            <Title title={'Participants Details'} desc={`For Upcoming camp.`}></Title>
            <DataTable
                columns={columns}
                data={userupcomingCamp}
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

export default UpcomingParticipantDetails;