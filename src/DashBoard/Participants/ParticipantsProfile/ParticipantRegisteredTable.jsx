// import React from 'react';

import DataTable from "react-data-table-component";
import Title from "../../../Components/Title/Title";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading";
import useAuth from "../../../hooks/useAuth";

const ParticipantRegisteredTable = ({ profile }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: yourRegisterdCamps = [], isLoading } = useQuery({
        queryKey: ['yourregisteredcamps', user],
        enabled: !!user?.email && !!localStorage.getItem('token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/singleregisteredcamp/${user?.email}`)
            return res?.data
        }
    })
    console.log(yourRegisterdCamps, user?.email);

    if (isLoading ) {
        return <Loading></Loading>
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
            name: 'Specialized Service',
            selector: row => <p className="font-medium">{row?.campInfo?.campSpecializedService}</p>
        },
        {
            name: 'Camp Fees',
            selector: row => <p className="font-medium">${row?.campInfo?.campFee}</p>
        },
    ]
    return (
        <div>
            <div className="mt-10">
                <Title title={'Camps'} desc={'Attended by you'}></Title>
                <DataTable
                pagination
                    columns={columns}
                    data={ yourRegisterdCamps}
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

export default ParticipantRegisteredTable;