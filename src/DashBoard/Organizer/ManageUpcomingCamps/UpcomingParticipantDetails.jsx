// import React from 'react';

import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Components/Loading";
import { useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";

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


    ]
    return (
        <div>
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