// import React from 'react';


import BannerTitle from './BannerTitle';
import BannerDescription from './BannerDescription';
import BannerSlider from './BannerSlider';
const Banner = () => {

    return (
        <div className='relative'>
            <div className='max-h-screen overflow-hidden flex justify-center items-center   mx-auto'>
                <BannerSlider></BannerSlider>
            </div>
            <div
                // initial={{ x: -100, opacity: 0, scale: 0.5 }}
                // whileInView={{ x: 0, opacity: 1, scale: 1 }}
                // transition={{ duration: 1 }}
                className='top-0 bg-[#00000053] px-2 sm:px-5 flex flex-col justify-center absolute  z-10 h-full w-full   text-white '>
               
                    <BannerTitle></BannerTitle>

                    <BannerDescription></BannerDescription>
                

            </div>
        </div>
    );
};

export default Banner;