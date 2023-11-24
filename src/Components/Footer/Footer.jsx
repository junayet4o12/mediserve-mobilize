// import React from 'react';

import { Link } from "react-router-dom";
import logo from '../../assets/LOGO.png'
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 bg-base-300 text-base-content">
                <nav className="">
                    <img className="w-32 h-32" src={logo} alt="" />
                </nav>
                <nav>
                    <header className="footer-title">Navigate</header>
                    <Link to={'/'}><a className="link link-hover" >Home</a></Link>
                    <Link to={'/availablecamps'}><a className="link link-hover" >Available Camps</a></Link>
                    <Link to={'/dashboard'}><a className="link link-hover" >Dashboard</a></Link>
                    <Link to={'/contactus'}><a className="link link-hover" >Contact Us</a></Link>
                    
                </nav>
               
                <nav>
                    <header className="footer-title">Contact Us</header>
                    <div className="grid grid-flow-col gap-4">
                        <a><TwitterIcon></TwitterIcon></a>
                        <a href="https://www.facebook.com/profile.php?id=100056107479254"><FacebookIcon></FacebookIcon></a>
                        <a><InstagramIcon></InstagramIcon></a>
                    </div>
                    <p className="text-base font-medium"><EmailIcon></EmailIcon> Email: muhammadjunayetmaruf@gmail.com</p>
                    <p className="text-base font-medium"><CallIcon></CallIcon> Number: 01632323232</p>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;