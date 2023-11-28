// import React from 'react';

import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import Gallery from "./Gallery/Gallery";
import PupularCamp from './PopularCamp/PopularCamp'
import Testimonials from "./Testimonials/Testimonials";
import UpcommingCamp from "./UpcommingCamp/UpcommingCamp";
const Home = () => {

    return (
        <div>
            <Helmet>
                <title>Mediserve Mobilize | Home</title>
            </Helmet>
            <Banner></Banner>
            <PupularCamp></PupularCamp>
            <Testimonials></Testimonials>
            <Gallery></Gallery>
            <UpcommingCamp></UpcommingCamp>
        </div>
    );
};

export default Home;