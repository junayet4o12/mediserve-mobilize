// import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic'
import Title from '../../Components/Title/Title';
import CampCard from './CampCard';
const PopularCamp = () => {
    const axiosPublic = useAxiosPublic()

    const { data: popularCamp = [] } = useQuery({
        queryKey: ['popularCamp'],
        queryFn: async () => {
            const res = await axiosPublic.get('/popularcamp')
            return res?.data
        }
    })
    console.log(popularCamp);
    return (
        <div className='bg-blue-50'>
            <div>
                <Title title={'Popular Camps'} desc={'Explore Our Popular Wellness Camps'}></Title>
            </div>

            <div className='flex flex-wrap justify-center items-center gap-10'>
                {
                    popularCamp.map(camp=><CampCard key={camp?._id} camp={camp}></CampCard>)
                }
            </div>
        </div>
    );
};

export default PopularCamp;