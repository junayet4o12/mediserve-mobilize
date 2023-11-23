// import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const BannerTitle = () => {
    return (
        <div className='h-max sm:h-[80px] max-w-md'>
            <TypeAnimation
                    sequence={[
                        'Health Harmony Achieved',
                        3000,
                        'Pioneering Past, Progressive Future',
                        3000,
                        'Conditioned for Compassion',
                        3000,
                        'Service Beyond Expectations',
                        3000,
                        'Mobilizing Wellness with Precision',
                        3000
                    ]}
                    className='text-xl sm:text-4xl'
                    wrapper="span"
                    speed={30}
                    style={{ display: 'inline-block', fontWeight: 'bold' }}
                    repeat={Infinity}
                />
        </div>
    );
};

export default BannerTitle;