// import React from 'react';

import { useContext } from "react";
import { AuthContext } from "../../firebase/authProvider/AuthProviders";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import Title from "../../Components/Title/Title";
import { FaStar } from "react-icons/fa";
const OrganizersFeedback = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: yourfeedback = [], isLoading } = useQuery({
        queryKey: ['yourfeedback', user],
        enabled: !!user?.email && !!localStorage.getItem('token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/feedback/${user?.email}`)
            return res?.data
        }
    })

    if (isLoading) {
        return <p>Loading</p>
    }
    const columns = [

        {
            name: 'Participants img',
            selector: row => <img className="max-w-[80px] max-h-[80px] rounded-full m-2" src={row?.image} alt="" />
        },
        {
            name: 'Name',
            selector: row => <p className="font-medium">{row?.participant}</p>
        },
        {
            name: 'Camp Name',
            selector: row => <p className="font-medium">{row?.campName}</p>
        },
        {
            name: 'Rating',
            selector: row => <p className="font-medium flex gap-1 items-center"><FaStar></FaStar> {row?.rating}</p>
        }
    ]
    return (
        <div>
            <div className="mt-10">
                <Title title={'Feedback Giver'} desc={'Who Give You Feedback'}></Title>
                <DataTable
                    columns={columns}
                    data={yourfeedback}
                    selectableRowsHighlight
                    highlightOnHover

                    customStyles={{


                        rows: {

                        },
                        headCells: {
                            style: {
                                paddingLeft: '8px',
                                paddingRight: '8px',
                                background: '#63b3ed',
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

export default OrganizersFeedback;