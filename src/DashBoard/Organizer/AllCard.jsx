// import React from 'react';
import DataTable from "react-data-table-component";

import { useContext } from "react";
import { AuthContext } from "../../firebase/authProvider/AuthProviders";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Title from "../../Components/Title/Title";
import Loading from '../../Components/Loading'
const AllCard = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: yourcamps = {}, isLoading } = useQuery({
        queryKey: ['yourcamps', user],
        enabled: !!user?.email && !!localStorage.getItem('token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/campsbyemail/${user?.email}`)
            return res?.data
        }
    })
    

    if (isLoading ) {
        return <Loading></Loading>
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
            name: 'Target Audience',
            selector: row => <p className="font-medium">{row?.targetAudience}</p>
        },
        {
            name: 'Participators',
            selector: row => <p className="font-medium">{row?.participators}</p>
        },
    ]
    
    return (
        <div>
            <div className="mt-10">
                <Title title={'Camps'} desc={'Added by you'}></Title>
                <DataTable
                    columns={columns}
                    data={yourcamps}
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
        </div>
    );
};

export default AllCard;