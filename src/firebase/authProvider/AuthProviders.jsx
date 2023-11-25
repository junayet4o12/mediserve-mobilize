// import React from 'react';

import { createContext, useEffect, useState } from "react";
import useAxiosPublic from '../../hooks/useAxiosPublic'
// import { auth } from "../firebaseconfig";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";
export const AuthContext = createContext(null);
const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setloading] = useState(true)
    const axiosPublic = useAxiosPublic();
    const createUser = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass)
    }
    const loginUser = (email, pass) => {
        setloading(true)
        return signInWithEmailAndPassword(auth, email, pass)
    }
    const logOut = () => {
        setloading(true)
        return signOut(auth)
    }
    const provider = new GoogleAuthProvider();
    const googleLogIn = () => {
        setloading(true)
        return signInWithPopup(auth, provider)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if (currentUser) {
                const userInfo = { email: currentUser?.email }
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        console.log(res?.data);
                        if (res?.data) {
                            localStorage.setItem('token', res?.data?.token)
                        }
                    })
            }
            else {
                localStorage.removeItem('token')
            }
            setloading(false);
        })
        return () => {
            return unsubscribe()
        }
    }, [axiosPublic])
    const authInfo = { user, loading, createUser, loginUser, logOut, googleLogIn };


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;