// import React from 'react';

import { useContext } from "react";
import { AuthContext } from "../firebase/authProvider/AuthProviders";

const useAuth = () => {
    const givingAuth = useContext(AuthContext)
    return givingAuth
};

export default useAuth;