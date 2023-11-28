// import React from 'react';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import page404 from '../../assets/404.svg'
import manhalf1 from '../../assets/manfalf1.svg'
import manhalf2 from '../../assets/manhalf2.svg'
import './Error.css'

const Error = () => {
    const error = useRouteError();
    
    const nevigate = useNavigate();
    const handleback = () => {
        nevigate(-1);
    }
    

    return (
        <div id="error-page" className="flex flex-col lg:flex-row justify-center items-center gap-5 bg-blue-50 min-h-screen pb-7">

            <div className=" items-center relative">
                <img className="w-[270px] sm:w-[400px] md:w-[500px]" src={page404} alt="" />
                <div className=" w-[115px]  sm:w-[170px] md:w-[200px] flex flex-col absolute top-10  sm:top-14 md:top-24 right-[-20px] ">
                    <img  className="z-20 part1" src={manhalf1} alt="" />
                    <img className="z-10 mt-[-67px] sm:mt-[-100px] md:mt-[-110px]" src={manhalf2} alt="" />
                </div>
            </div>


            <div className="flex flex-col justify-center items-center gap-1">

                <p className="text-center text-xl font-medium">Sorry, an unexpected error has occurred.</p>
                <p className="text-center">
                    <i className="text-center text-xl font-normal">{error?.statusText || error?.message}</i>
                </p>
                <div className="text-center flex gap-3">
                    <button onClick={handleback} className="btn  backbtn">Go back</button>
                    <Link to="/"><button className="btn bg-red-500 homebtn">go home</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Error;