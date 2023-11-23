// import React from 'react';
import TextTransition, { presets } from 'react-text-transition';
import { useEffect, useState } from 'react';
const BannerDescription = () => {
    const TEXTS = [
        ' Discover a decade-long journey of successfully mobilizing medical campaigns for communities in need. From vaccinations to health screenings, our track record speaks volumes about our commitment to promoting well-being.',

        'Explore our pioneering initiatives that have set the benchmark for medical campaigns. Uncover how our past activities have shaped a progressive future in healthcare accessibility, making a lasting impact on communities far and wide.',

        ' Dive into how our dedicated team ensures optimal conditions for health services. From state-of-the-art medical equipment to well-organized campaigns, we prioritize the well-being of all participants, creating a compassionate and caring environment.',

        'Learn about our commitment to providing service beyond expectations. Our testimonials and success stories showcase a dedication to delivering outstanding medical services, making a difference in the lives of countless individuals.',

        ' Witness how our meticulous planning and execution have led to successful medical campaigns. Explore how we combine precision in logistics with a passion for wellness, ensuring that every service provided is delivered with excellence.'
    ];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(
            () => setIndex((index) => index + 1),
            8000,
        );
        return () => clearTimeout(intervalId);
    }, []);
    return (
        <div >

            <p className="pb-2 pt-7 sm:pb-4 font-semibold text-sm max-w-md">
                <TextTransition springConfig={presets.molasses}
                >
                    {TEXTS[index % TEXTS.length]}</TextTransition>
            </p>
        </div>
    );
};

export default BannerDescription;