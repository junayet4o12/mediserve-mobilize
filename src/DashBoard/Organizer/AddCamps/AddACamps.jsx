// import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import campbg from '../../../assets/addCamp.jpg'
import './AddCamps.css'
import { useState } from 'react';
import Title from '../../../Components/Title/Title';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
const AddACamps = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [targetedAudience, setTargetAudience] = useState('');
    const imgHostingKey = import.meta.env.VITE_IMG_HOSTING_KEY;
    const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`
    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm()
    const handleChange = (event) => {
        setTargetAudience(event.target.value);
    };
    const onSubmit = async (data) => {

        Swal.fire({
            title: "Are you sure?",
            text: "It will be shown to users",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Add !"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const image = { image: data?.image[0] }
                const res = await axios.post(imgHostingApi, image, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })
                const imgurl = res?.data?.data?.display_url
                const campDetails = {
                    campName: data?.campName,
                    description: data?.description,
                    image: imgurl,
                    campFees: parseFloat(data?.campFees),
                    DateAndTime: {
                        date: Date.parse(data?.date),
                        startTime: (data?.startTime)?.split(':')?.reduce((a, b, i) => a + parseInt(b, 10) * Math.pow(60, 1 - i), 0) * 60000,
                        endTime: (data?.endTime)?.split(':')?.reduce((a, b, i) => a + parseInt(b, 10) * Math.pow(60, 1 - i), 0) * 60000
                    },
                    venueLocation: {
                        placeName: data?.placeName,
                        latitude: parseFloat(data?.latitude),
                        longitude: parseFloat(data?.longitude)
                    },
                    specializedService: data?.specializedService,
                    healthcareExpert: data?.healthcareExpert,
                    targetAudience: data?.targetAudience,
                    participators: 0,
                    benefits: [
                        data?.benefits1,
                        data?.benefits2 || 'Not Given',
                        data?.benefits3 || 'Not Given',
                        data?.benefits4 || 'Not Given',
                        data?.benefits5 || 'Not Given'
                    ],
                    organizerEmail: user?.email
                }
                axiosSecure.post('/camps', campDetails)
                    .then(res => {
                        console.log(res?.data);
                        if (res?.data?.insertedId) {
                            Swal.fire({
                                title: "Added!!",
                                text: "Your Camp has Added successfully",
                                icon: "success"
                            });
                            reset()
                        }
                    })

            }
        });
    }
    const targetaudience = [
        "Adults aged 40 and above",
        "Seniors aged 65 and above",
        "All age groups",
        "Women of all ages",
        "Children aged 1-12 and their parents/guardians",
        "All fitness levels and age groups",
        "Young adults aged 18-30",
        "Teens aged 13-19",
        "Individuals with chronic health conditions",
        "Families and caregivers",
        "Employees of XYZ Corporation",
        "Local community residents",
        "Medical professionals and healthcare workers",
        "Individuals seeking preventive healthcare",
        "Patients with specific medical conditions",
        "Community members interested in health education"
    ]
    return (
        <div className='bg-cover bg-no-repeat  bg-center ' style={{ background: `url(${campbg})` }}>
            <div className='w-full   bg-[#00000069] py-10'>
            <Helmet>
                <title>Mediserve Mobilize |  Add Camp</title>
            </Helmet>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className=' p-1 sm:p-4 md:w-[80%] mx-auto bg-[#ffffffa2] rounded-t-lg'>
                        <Title title={'Add Camp'} desc={'Add A Camp You Want'}></Title>
                    </div>
                    <div className='grid grid-cols-1: md:grid-cols-2 gap-x-7 gap-y-5 p-1 sm:p-4 md:w-[80%] mx-auto bg-[#ffffffa2] mb-10 rounded-b-lg'>
                        <div>
                            <TextField
                                {...register("campName", { required: true })}
                                sx={{ bgcolor: 'white', borderRadius: '5px', overflow: 'hidden', width: '100%' }}
                                id="filled-basic"
                                label="Camp Name"
                                variant="filled"

                            />
                            <br />
                            {errors.campName && <span className='text-red-500 text-sm font-bold'>Camp Name is required</span>}
                        </div>
                        <div>
                            <TextField
                                {...register("campFees", { required: true })}
                                sx={{ bgcolor: 'white', borderRadius: '5px', overflow: 'hidden', width: '100%' }}
                                id="filled-basic"
                                label="Camp Fees"
                                variant="filled"
                                type='number'
                            />
                            <br />
                            {errors.campFees && <span className='text-red-500 text-sm font-bold'>Camp Fees is required</span>}
                        </div>
                        <div>
                            <TextField
                                {...register("specializedService", { required: true })}
                                sx={{ bgcolor: 'white', borderRadius: '5px', overflow: 'hidden', width: '100%' }}
                                id="filled-basic"
                                label="Specialized Service"
                                variant="filled"
                            />
                            <br />
                            {errors.specializedService && <span className='text-red-500 text-sm font-bold'>Specialized Service is required</span>}
                        </div>
                        <div>
                            <TextField
                                {...register("healthcareExpert", { required: true })}
                                sx={{ bgcolor: 'white', borderRadius: '5px', overflow: 'hidden', width: '100%' }}
                                id="filled-basic"
                                label="Healthcare Expert"
                                variant="filled"
                            />
                            <br />
                            {errors.healthcareExpert && <span className='text-red-500 text-sm font-bold'>Healthcare Expert Service is required</span>}
                        </div>
                        <div>
                            <FormControl variant="filled"
                                sx={{ bgcolor: 'white', borderRadius: '5px', height: 'max-content', overflow: 'hidden', width: '100%' }}
                            >
                                <InputLabel id="demo-simple-select-filled-label">Target Audience</InputLabel>

                                <Select
                                    sx={{ width: '100%' }}
                                    {...register("targetAudience", { required: true })}
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={targetedAudience}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>

                                    {
                                        targetaudience?.map((audience) => <MenuItem key={audience} value={audience}> {audience}</MenuItem>)
                                    }
                                </Select>

                            </FormControl>
                            <br />
                            {errors.targetAudience && <span className='text-red-500 text-sm font-bold'>Target Audience is required</span>}
                        </div>

                        <div className='md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-2 bg-[#ffffffa2] p-2 rounded-lg py-5'>
                            <h2 className='text-xl font-bold w-full  flex justify-center items-center '>Vanue Location</h2>
                            <div>
                                <TextField
                                    {...register("placeName", { required: true, width: '100%' })}
                                    sx={{ bgcolor: 'white', borderRadius: '5px', overflow: 'hidden', width: '100%' }}
                                    id="filled-basic"
                                    label="Place Name"
                                    variant="filled"
                                />
                                <br />
                                {errors.placeName && <span className='text-red-500 text-sm font-bold'>Place Name  is required</span>}
                            </div>
                            <div>
                                <TextField
                                    {...register("latitude", { required: true })}
                                    sx={{ bgcolor: 'white', borderRadius: '5px', overflow: 'hidden', width: '100%' }}
                                    id="filled-basic"
                                    label="Latitude"
                                    variant="filled"
                                    type='number'
                                />
                                <br />
                                {errors.latitude && <span className='text-red-500 text-sm font-bold'>Latitude  is required</span>}
                            </div>
                            <div>
                                <TextField
                                    {...register("longitude", { required: true })}
                                    sx={{ bgcolor: 'white', borderRadius: '5px', overflow: 'hidden', width: '100%' }}
                                    id="filled-basic"
                                    label="Longitude"
                                    variant="filled"
                                    type='number'
                                />
                                <br />
                                {errors.longitude && <span className='text-red-500 text-sm font-bold'>longitude  is required</span>}
                            </div>
                        </div>

                        <div className='md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-2 bg-[#ffffffa2] p-2 rounded-lg py-5'>
                            <h2 className='text-xl font-bold w-full  flex justify-center items-center '>Select Date And Time</h2>
                            <div>

                                <p>Select Date</p>
                                <TextField
                                    {...register("date", { required: true })}
                                    sx={{ bgcolor: 'white', borderRadius: '5px', overflow: 'hidden', width: '100%' }}
                                    id="filled-basic"
                                    variant="filled"
                                    type='date'
                                />
                                <br />
                                {errors.date && <span className='text-red-500 text-sm font-bold'>Date  is required</span>}
                            </div>
                            <div>
                                <p>Start Time</p>
                                <TextField
                                    {...register("startTime", { required: true })}
                                    sx={{ bgcolor: 'white', borderRadius: '5px', overflow: 'hidden', width: '100%' }}
                                    id="filled-basic"
                                    variant="filled"
                                    type='time'
                                />
                                {errors.startTime && <span className='text-red-500 text-sm font-bold'>Start Time  is required</span>}
                            </div>
                            <div>
                                <p>End Time</p>
                                <TextField
                                    {...register("endTime", { required: true })}
                                    sx={{ bgcolor: 'white', borderRadius: '5px', overflow: 'hidden', width: '100%' }}
                                    id="filled-basic"
                                    variant="filled"
                                    type='time'
                                />
                                {errors.endTime && <span className='text-red-500 text-sm font-bold'>End Time   is required</span>}
                            </div>
                        </div>
                        <div className='md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-2 bg-[#ffffffa2] p-2 rounded-lg py-5'>
                            <h2 className='text-xl font-bold w-full  flex justify-center items-center '>Benefits</h2>
                            <div>
                                <TextField
                                    {...register("benefits1", { required: true })}
                                    sx={{ bgcolor: 'white', borderRadius: '5px', overflow: 'hidden', width: '100%' }}
                                    id="filled-basic"
                                    label="Benefits1"
                                    variant="filled"
                                />
                                <br />
                                {errors.benefits1 && <span className='text-red-500 text-sm font-bold'>Benefits 1  is required</span>}
                            </div>
                            <TextField
                                {...register("benefits2")}
                                sx={{ bgcolor: 'white', borderRadius: '5px', overflow: 'hidden' }}
                                id="filled-basic"
                                label="Benefits2"
                                variant="filled"
                            />
                            <TextField
                                {...register("benefits3")}
                                sx={{ bgcolor: 'white', borderRadius: '5px', overflow: 'hidden' }}
                                id="filled-basic"
                                label="Benefits3"
                                variant="filled"
                            />
                            <TextField
                                {...register("benefits4")}
                                sx={{ bgcolor: 'white', borderRadius: '5px', overflow: 'hidden' }}
                                id="filled-basic"
                                label="Benefits4"
                                variant="filled"
                            />
                            <TextField
                                {...register("benefits5")}
                                sx={{ bgcolor: 'white', borderRadius: '5px', overflow: 'hidden' }}
                                id="filled-basic"
                                label="Benefits5"
                                variant="filled"
                            />
                        </div>

                        <div>
                            <p>Select Image</p>
                            <input
                                {...register("image", { required: true })}
                                className='w-full p-3 bg-[#ffffffa2] rounded-md'
                                type='file'
                            />
                            {errors.image && <span className='text-red-500 text-sm font-bold'>Image  is required</span>}
                        </div>
                        <div className='w-full h-32 md:col-span-2'>
                            <p>Add Description</p>
                            <textarea placeholder='Description'
                                {...register("description", { required: true })}
                                className='w-full h-28 bg-[#ffffffa2]p-2 px-4 rounded-lg'></textarea>
                            {errors.description && <span className='text-red-500 text-sm font-bold'>description  is required</span>}
                        </div>
                        <div className='w-full h-32 md:col-span-2 text-center'>
                            <button className='btn btn-neutral  addcampbtn border-none rounded-sm bg-blue-500'>Add Camp</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddACamps;