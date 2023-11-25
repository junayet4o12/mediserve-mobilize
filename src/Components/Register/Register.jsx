// import React from 'react';
import { motion } from "framer-motion"
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { GiArchiveRegister } from 'react-icons/gi';
import { MdLogin } from 'react-icons/md';
import { BiLogoGoogle } from 'react-icons/bi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { auth } from "../../../firebase/firebaseconfig";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../firebase/authProvider/AuthProviders";
import useGoogleLogin from "../../hooks/useGoogleLogin";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { auth } from "../../firebase/firebaseconfig";
import registerimg from '../../assets/register.svg'
import { MdDriveFileRenameOutline,MdOutlineInsertPhoto  } from "react-icons/md";
const Register = () => {
    const { createUser } = useContext(AuthContext)
    const loginwithgoogle = useGoogleLogin()
    const [showpass, setshowpass] = useState(true);
    const [passvalue, setpassvalue] = useState(null)

    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const handlepassvalue = (e) => {
        e.preventDefault()
        setpassvalue(e.target.value);
        console.log(e.target.value);
    }
    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm()
    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
            .then(res => {
                console.log(res.user);
                updateProfile(auth.currentUser, {
                    displayName: data.name,
                    photoURL: data.photourl

                })
                    .then(() => {
                        console.log('user progile info updated');
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        icon: "success",
                                        title: "User Created Successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    reset();
                                    navigate('/')
                                }
                            })

                    })
                    .catch(err => console.log(err))
            })
    }
    const handlegooglelogin = () => {
        loginwithgoogle()
    }
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Register</title>
            </Helmet>
            <div className="py-7 px-7 flex  overflow-hidden">
                <motion.div
                    initial={{ y: -100, }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.5 }} className='w-[50%]  justify-center hidden lg:block items-center'>
                    <div className='h-full flex justify-center items-center'>
                        <img className='w-[500px] h-[400px]  object-cover' src={registerimg} alt="" />
                    </div>
                </motion.div>
                <motion.form onSubmit={handleSubmit(onSubmit)} initial={{ y: 100, }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-[550px]  mx-auto ">

                    <div className="mx-auto w-[100%] p-5  pb-10 text-black  ">
                        <h2 className="text-3xl font-bold uppercase  text-center mb-6 text-gray-600 ">Register</h2>
                        <div className="flex flex-col justify-center items-center gap-9 text-sm font-medium">
                            <div className="relative w-full sm:w-[450px]">
                                <input name="name" {...register("name", { required: true })} className="w-full  sm:w-[450px]  bg-gray-200 p-3 px-10 rounded-lg " type="text" placeholder="Name" />
                                {errors.name && <span className='text-red-500'>Name is required</span>}
                                <p className='text-xl absolute top-3.5 left-3 '><MdDriveFileRenameOutline></MdDriveFileRenameOutline></p>
                            </div>
                            <div className="relative w-full sm:w-[450px]">
                                <input name="photourl" {...register("photourl", { required: true })} className="w-full  sm:w-[450px]  bg-gray-200 p-3 px-10 rounded-lg " type="file" placeholder="Photo Url" />
                                {errors.photourl && <span className='text-red-500'>PhotoUrl is required</span>}
                                <p className='text-xl absolute top-3.5 left-3 '><MdOutlineInsertPhoto></MdOutlineInsertPhoto ></p>
                            </div>
                            <div className="relative w-full sm:w-[450px]">
                                <input required name="email" {...register("email", { required: true })} className="w-full  sm:w-[450px]  bg-gray-200 p-3 px-10 rounded-lg " type="email" placeholder="email" />
                                {errors.email && <span className='text-red-500'>Email is required</span>}
                                <p className='text-xl absolute top-3.5 left-3 '><HiOutlineMail></HiOutlineMail></p>
                            </div>
                            <div className="relative w-full sm:w-[450px]">
                                <input
                                    onChange={handlepassvalue}
                                    type={showpass ? 'password' : 'text'} name="password" {...register("password", {
                                        required: true,
                                        minLength: 8,
                                        maxLength: 20,
                                        pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/
                                    })} className="w-full  sm:w-[450px]  bg-gray-200 p-3 px-10 rounded-lg " placeholder="password" />
                                <p className='text-xl absolute top-3 left-3 '><RiLockPasswordLine></RiLockPasswordLine></p>
                                <p onClick={() => (setshowpass(!showpass))} className={`absolute top-2 right-0 mr-2 cursor-pointer text-lg  p-1`}>{showpass ? <AiOutlineEye></AiOutlineEye> : <AiOutlineEyeInvisible></AiOutlineEyeInvisible>}</p>
                                {errors?.password?.type === 'required' && <span className='text-red-500'>Password invalid</span>}
                                {errors?.password?.type === 'minLength' && <span className='text-red-500'>Password must be minimum 8 charecters</span>}
                                {errors?.password?.type === 'maxLength' && <span className='text-red-500'>Password must be maximum 20 charecters</span>}
                                {errors?.password?.type === 'pattern' && <span className='text-red-500'>Password must contain at least one digit, one lowercase letter, and one uppercase letter.</span>}

                                <div>

                                </div>
                                <div className='flex justify-between p-2 gap-3'>
                                    <p className='text-sm font-medium'>Already have an Account? <br /> <Link to='/login'><span className='font-bold Register text-gray-700 hover:text-gray-900 cursor-pointer flex gap-1 hover:underline items-center'><GiArchiveRegister></GiArchiveRegister>Log in</span></Link></p>

                                </div>
                            </div>
                            <div className='w-full flex flex-col  justify-center items-center gap-2'>
                                <button type='submit' className='btn bg-gradient-to-r  w-full  sm:w-[450px]  text-white font-bold rounded-lg border-none bg-[#D1A054B2] hover:bg-[#d19f54ea]'><MdLogin></MdLogin> Register</button>
                                <p>Or</p>
                                <p
                                    onClick={handlegooglelogin}
                                    className='btn border border-black btn-sm text-black btn-circle font-bold text-xl hover:bg-black hover:text-white'><BiLogoGoogle></BiLogoGoogle></p>
                            </div>
                        </div>

                    </div>
                </motion.form>
            </div>
        </div>
    );
};

export default Register;