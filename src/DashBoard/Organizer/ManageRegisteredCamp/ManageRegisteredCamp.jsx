// import React from 'react';

import Title from "../../../Components/Title/Title";
import ManageRegistgeredCampTable from "./ManageRegistgeredCampTable";

const ManageRegisteredCamp = () => {
    return (
        <div>
            <Title title={'Manage Registered Camp'} desc={'Manage Registered Camp Add by Participators'}></Title>
            <h2 className="text-3xl font-bold text-center py-5 px-2">All Camps Added by participators</h2>
            <ManageRegistgeredCampTable></ManageRegistgeredCampTable>
        </div>
    );
};

export default ManageRegisteredCamp;