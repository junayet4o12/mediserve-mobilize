// import React from 'react';
import { RiChatDeleteFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading";
import DataTable from "react-data-table-component";
import Title from "../../../Components/Title/Title";

const UpcomingProfessionalsDetails = () => {
    const { user } = useAuth()
    const { query } = useParams();
    console.log(query);
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
    const timeForm = (time) => {
        return new Date(time)
    }
    console.log(professionalupcomingCamp);
    const columns = [


        {
            name: 'Id',
            selector: row => <p className="font-medium">{professionalupcomingCamp.indexOf(row) + 1}</p>
        },
        {
            name: 'Professional Name',
            selector: row => <p className="font-medium">{row?.professionalName}</p>
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
        }


    ]
    return (
        <div>
            <Title title={'Professionals Details'} desc={`For Upcoming camp.`}></Title>
            <DataTable
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