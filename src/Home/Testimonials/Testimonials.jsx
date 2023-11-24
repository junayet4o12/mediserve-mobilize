// import React from 'react';

import Title from "../../Components/Title/Title";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import CardContent from '@mui/material/CardContent';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';



import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Scrollbar, A11y, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';
import { EffectCube } from 'swiper/modules';
import { Box, CardMedia, Rating } from '@mui/material';
import './testimonials.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
const Testimonials = () => {
    const axiosPublic = useAxiosPublic()
    const { data: testimonials = [] } = useQuery({
        queryKey: ['testimonials'],
        queryFn: async () => {
            const res = await axiosPublic.get('/feedback')
            return res?.data
        }
    })
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };
    const formDate = (numericDate) => {
        const date = new Date(numericDate);
        const formattedDate = date.toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
        return formattedDate;
    }
    return (
        <div className="bg-blue-50 py-16">
            <Title title={'Testimonials'} desc={'Hear From Our Participants'}></Title>
            <div>
                <Swiper
                    modules={[Navigation, Scrollbar, A11y, EffectCube, Autoplay, Pagination]}
                    pagination={pagination}
                    
                    slidesPerView={1}
                    breakpoints={{
                        800: {
                            slidesPerView: 2,
                        },
                        1150: {
                            slidesPerView: 3,
                        },
                    }}

                    speed={2000}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}

                >
                    {
                        testimonials.map(item => <SwiperSlide key={item._id}>
                            <Card sx={{ maxWidth: 345, height: '330px', mx: 'auto', color: '#36A2C1', boxShadow: '0px 0px 15px 7px #00000056' }}>
                                <Box >
                                    <img className="w-24 h-24 rounded-full mx-auto mt-5 bg-blue-300" src={item?.image} alt="" />
                                    <Typography variant="body2" sx={{fontWeight:'bold', fontSize: '18px', textAlign: 'center', p: '5px'}}>
                                         {item?.participant}
                                    </Typography>
                                    <Typography variant="body2" sx={{fontWeight:'bold', fontSize: '14px',  pt: '5px', px: '16px' }}>
                                         Given feedback to &quot;{item?.campName}&quot;
                                    </Typography>
                                    <Typography variant="body2" sx={{fontWeight:'bold', fontSize: '13px',  pt: '5px', px: '16px' }}>
                                         {formDate(item?.time)}
                                    </Typography>
                                </Box>

                                <CardContent>
                                    <Typography variant="body2" color="text.secondary" sx={{textAlign: 'justify'}} >
                                        {item?.feedback}
                                    </Typography>
                                </CardContent>

                                <Typography sx={{  textAlign:'center' }}>
                                    <Rating sx={{ color: '#36A2C1 ' }} name="half-rating-read" defaultValue={item?.rating} precision={0.1}
                                        icon={<FavoriteIcon fontSize="inherit" />}
                                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                        readOnly />
                                </Typography>
                            </Card>
                        </SwiperSlide>)
                    }




                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;