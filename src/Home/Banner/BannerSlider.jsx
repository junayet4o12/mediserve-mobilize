// import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';
import banner1 from '../../assets/banner1.jpg'
import banner2 from '../../assets/banner2.jpg'
import banner3 from '../../assets/banner3.jpg'
import banner4 from '../../assets/banner4.jpg'
import banner5 from '../../assets/banner5.jpg'
const BannerSlider = () => {
    return (

        <Swiper
            modules={[Navigation, Scrollbar, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}

            scrollbar={{ draggable: true }}
            speed={5000}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}

        >
            <SwiperSlide>
                <img src={banner1} className=" lg:h-[100vh] lg:w-full object-cover" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={banner2} className="lg:h-[100vh] lg:w-full object-cover" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={banner3} className="lg:h-[100vh] lg:w-full object-cover" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={banner4} className="lg:h-[100vh]  lg:w-full object-cover" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={banner5} className="lg:h-[100vh] lg:w-full object-cover" />
            </SwiperSlide>


        </Swiper>

    );
};

export default BannerSlider;