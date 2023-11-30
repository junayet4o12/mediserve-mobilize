// import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic'
import Title from '../../Components/Title/Title';
import CampCard from './CampCard';
import Loading from '../../Components/Loading';
import { useState } from 'react';
const PopularCamp = () => {
    const axiosPublic = useAxiosPublic()
    const [sorted, setsorted] = useState(true)
    const { data: popularCamp = [], isLoading: popularCampisLoading } = useQuery({
        queryKey: ['pularcamps'],
        queryFn: async () => {
            const res = await axiosPublic.get('/popularcamp')
            return res?.data
        }
    })
    const { data: popularCamps = [], isLoading: popularCampsisLoading } = useQuery({
        queryKey: ['popularCamp'],
        queryFn: async () => {
            const res = await axiosPublic.get('/popularcamps')
            return res?.data
        }
    })
    if (popularCampisLoading || popularCampsisLoading) {
        return <Loading></Loading>
    }
    console.log(popularCamp);
    return (
        <div className='bg-blue-50'>
            <div>
                <Title title={'Popular Camps'} desc={'Explore Our Popular Wellness Camps'}></Title>
            </div>
            <div className='py-10 text-center'>
                <button onClick={()=>setsorted(!sorted)} className='btn text-white bg-blue-500 login'>{
                    sorted ? 'See Most participants camp' : 'See Popular Camp'
                }</button>
            </div>
            <div className='flex flex-wrap justify-center items-center gap-10'>
                {
                    (!sorted ? popularCamp : popularCamps).map(camp => <CampCard key={camp?._id} camp={camp}></CampCard>)
                }
            </div>
        </div>
    );
};

export default PopularCamp;