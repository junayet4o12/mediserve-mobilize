// import React from 'react';

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useProfessional from "../../hooks/useProfessional";
import Loading from "../Loading";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseconfig";

const ProfessionalRouts = ({children}) => {
    const { user, loading } = useAuth()
    const [isProfessional, isProfessionalPanding] = useProfessional();
    const location = useLocation()
    if (loading || isProfessionalPanding) {
        return <Loading></Loading>
    }
    if (user && isProfessional) {
        return <div>
            {children}
        </div>

    }
    signOut(auth)
    return <Navigate to={'/login'} state={{ from: location }}></Navigate>;
};

export default ProfessionalRouts;