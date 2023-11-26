// import React from 'react';

import DataTable from "react-data-table-component";
import { GrUpdate } from "react-icons/gr";
import { RiChatDeleteFill } from "react-icons/ri";
import './ManageCamps.css'
import { Link } from "react-router-dom";
const ManageCampTable = ({ yourcamps }) => {
    const timeForm = (time) => {
        return new Date(time)
    }
    const handleDelete = (id) => {
        console.log(id);
    }

    // + 31536000000

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
            name: 'Location',
            selector: row => <p className="font-medium">{row?.venueLocation?.placeName}</p>
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
            name: 'Participators',
            selector: row => <p className="font-medium">{row?.participators}</p>
        },
        {
            name: 'Action',
            cell: row => <div className="flex  gap-2 ">
                <Link to={`/update-camp/${row?._id}`}>
                    <button title="Update Camp" className="btn btn-neutral bg-blue-400 border-none text-white text-lg font-bold updatebtn"><GrUpdate></GrUpdate></button>
                </Link>
                <button onClick={()=>handleDelete(row?._id)} title="Delete Camp" className="btn btn-neutral bg-black border-none text-white text-lg font-bold deletebtn"><RiChatDeleteFill></RiChatDeleteFill></button>
            </div>
        },
    ]
    return (
        <div>
            <div className="mt-10">
                <DataTable
                    columns={columns}
                    data={yourcamps}
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

export default ManageCampTable;