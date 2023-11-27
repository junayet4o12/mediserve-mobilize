// import React from 'react';

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useOrganizers from "../../hooks/useOrganizers";
import Loading from "../Loading";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseconfig";

const OrganizerRouts = ({children}) => {
    const { user, loading } = useAuth()
    const [isOrganizer, isOrganizerPanding] = useOrganizers();
    const location = useLocation()

    if (loading || isOrganizerPanding) {
        return <Loading></Loading>
    }
    if (user && isOrganizer) {
        return <div>
            {children}
        </div>

    }
    signOut(auth)
    return <Navigate to={'/login'} state={{ from: location }}></Navigate>;
   
};

export default OrganizerRouts;