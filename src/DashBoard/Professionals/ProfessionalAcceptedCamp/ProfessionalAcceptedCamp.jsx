// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";
import DataTable from "react-data-table-component";
import { Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Title from "../../../Components/Title/Title";
const ProfessionalAcceptedCamp = () => {
    const navigate = useNavigate()

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: acceptedCamps, isLoading: accepteIsLoading } = useQuery({
        queryKey: ['acceptedCamp', user],
        queryFn: async () => {
            const res = await axiosSecure.get(`/getacceptedCamp/${user?.email}`)
            return res?.data
        }
    })
    if (accepteIsLoading) {
        return <Loading></Loading>
    }
    const handleDetails = (camp) => {
        console.log(camp?.campId);
        axiosSecure.get(`/camps/${camp?.campId}`)
            .then(res => {
                if (res?.data) {
                    navigate(`/camp-details/${camp?.campId}`)
                }
                else {
                    axiosSecure.get(`upcommingcamps/${camp?.campId}`)
                        .then(res => {
                            if (res?.data) {
                                navigate(`/upcoming-camp-details/${camp?.campId}`)
                            }
                            
                        })

                }
            })

    }
    const columns = [

        {
            name: 'Camp Image',
            selector: row => <img className="max-w-[120px] max-h-[120px] rounded-lg m-2" src={row?.campInfo?.campImage} alt="" />
        },
        {
            name: 'Camp Name',
            selector: row => <p className="font-medium">{row?.campName}</p>
        },
        {
            name: 'Specialized Service',
            selector: row => <p className="font-medium">{row?.campInfo?.campSpecializedService}</p>
        },
        {
            name: 'Camp Fees',
            selector: row => <p className="font-medium">${row?.campInfo?.campFee}</p>
        },
        {
            name: 'See Details',
            cell: row => <button onClick={() => handleDetails(row)} className="btn text-white bg-blue-500 login">Details</button>
        },
    ]
    return (
        <div>
            <Helmet>
                <title>Mediserve Mobilize | Professional Accepted Camp</title>
            </Helmet>
            <Title title={'Accepted Camp'} desc={'See your accepted camp by the organizer'}></Title>
            <DataTable
            
                columns={columns}
                data={acceptedCamps}
                selectableRowsHighlight
                highlightOnHover
                pagination
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

export default ProfessionalAcceptedCamp;