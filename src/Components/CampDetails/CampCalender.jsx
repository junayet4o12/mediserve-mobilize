/* eslint-disable react/prop-types */
// import React from 'react';

import { Calendar } from 'react-date-range';
import './CampDetails.css'
const CampCalender = ({ date }) => {

    const { date: day, startTime, endTime } = date
    const timeForm = (time) => {
        return new Date(time)
    }
    const start = timeForm(startTime).toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true });
    
    const end = timeForm(endTime).toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true });

    return (
        <div className='w-max py-10'>
            <div className='flex justify-center items-center w-full gap-3'>
                <div className=' py-3 px-5 w-32  bg-white my-2 shadow-md rounded-md text-center font-bold text-sm text-blue-500'>{start}</div>
                <p className='text-center font-bold text-base text-blue-500'>TO</p>
                <div className=' py-3 px-5 w-32  bg-white my-2 shadow-md rounded-md text-center font-bold text-sm text-blue-500'>{end}</div>
            </div>
            <Calendar
            
            className='react-calendar bg'
                editableDateInputs={true}
                date={new Date(day + startTime)}
                rangeColors={['#51434a']}
            />

        </div>
    );
};

export default CampCalender;