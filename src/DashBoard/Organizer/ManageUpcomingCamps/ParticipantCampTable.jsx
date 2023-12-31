/* eslint-disable react/prop-types */
// import React from 'react';

import DataTable from "react-data-table-component";
import { GrUpdate } from "react-icons/gr";
import { RiChatDeleteFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const ParticipantCampTable = ({camps, refetch}) => {
    const timeForm = (time) => {
        return new Date(time)
    }
    const handleDelete = (row) => {
        console.log(row);
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
            name: 'Participant Name',
            selector: row => <p className="font-medium text-[11px]">{timeForm(row?.DateAndTime?.date).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })} ({timeForm(row?.DateAndTime?.startTime).toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true })} to {timeForm(row?.DateAndTime?.endTime).toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true })})`</p>
        },
        {
            name: 'Target Audience',
            selector: row => <p className="font-medium">{row?.targetAudience}</p>
        },
       
        {
            name: 'Specialized Service',
            selector: row => <p className="font-medium">{row?.specializedService}</p>
        },
        {
            name: 'Healthcare Expert',
            selector: row => <p className="font-medium">{row?.healthcareExpert}</p>
        },

        
        {
            name: 'Action',
            cell: row => <div className="flex  gap-2 ">
                <Link to={`/dashboard/update-camp/${row?._id}`}>
                    <button title="Update Camp" className="btn btn-neutral bg-blue-400 border-none text-white text-lg font-bold updatebtn"><GrUpdate></GrUpdate></button>
                </Link>
                <button onClick={() => handleDelete(row?._id)} title="Delete Camp" className="btn btn-neutral bg-black border-none text-white text-lg font-bold deletebtn"><RiChatDeleteFill></RiChatDeleteFill></button>
            </div>
        },
    ]
    return (
        <div>
             <DataTable
             pagination
                    columns={columns}
                    data={camps}
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

export default ParticipantCampTable;