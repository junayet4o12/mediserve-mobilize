// import React from 'react';

import Banner from "./Banner/Banner";
import Gallery from "./Gallery/Gallery";
import PupularCamp from './PopularCamp/PopularCamp'
import Testimonials from "./Testimonials/Testimonials";
import UpcommingCamp from "./UpcommingCamp/UpcommingCamp";
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PupularCamp></PupularCamp>
            <Testimonials></Testimonials>
            <Gallery></Gallery>
            <UpcommingCamp></UpcommingCamp>
        </div>
    );
};

export default Home;