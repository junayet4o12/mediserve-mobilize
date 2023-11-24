/* eslint-disable react/prop-types */
// import React from 'react';

const Title = ({ title, desc }) => {
    return (
        <div className="py-10 px-10 md:px-32">
            <h1 className="text-lg font-bold   text-[#36A2C1]">{title}</h1>
            <h2 className='text-2xl font-medium  max-w-lg  '>{desc}</h2>
        </div>
    );
};

export default Title;