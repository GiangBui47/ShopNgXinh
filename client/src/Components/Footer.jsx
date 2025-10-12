import React from 'react'
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{ fontFamily: '"Libre Baskerville", "Times New Roman", serif', fontSize: "13px" }}
            class="flex flex-col overflow-hidden gap-10 md:gap-20
             py-16 px-6 md:px-16 lg:px-24 xl:px-32  [&>li]:hover:underline ">
            <div className='flex flex-wrap justify-center lg:justify-between'>
                <div className='hidden lg:block'>
                    <h4 className="text-black text-[15px] mb-7">NEED HELPS</h4>
                    <ul className="space-y-2">
                        <li><a href=""><h5 className="text-black transition">FAQ</h5></a></li>
                        <li><a href="/" className=" transition">Want to make a</a></li>
                        <li><a href="/" className=" transition">Return?</a></li>
                        <li><a href="/" className=" transition">Track my order</a></li>
                        <li><a href=""><h5 className="text-black transition">Contact:</h5></a></li>
                        <li className='flex flex-col lg:flex'>Email:<a href="/" class=" transition">hello@gmail.com</a></li>
                        <li><a href="/" className=" transition">WhatsApp</a></li>
                        <li><a href="/" className=" transition">Iinstagram</a></li>
                        <li><a href=""><h5 className="text-black transition">Useful Information:</h5></a></li>
                        <li><a href="/" className=" transition">My Account</a></li>
                        <li><a href="/" className=" transition">My Delivery</a></li>
                        <li><a href="/" className=" transition">My Return</a></li>
                    </ul>
                </div>
                <div class='hidden lg:block'>
                    <h4 className="text-black text-[15px] mb-7">ABOUT</h4>
                    <ul className="space-y-2">
                        <li><a href="/" className=" transition">A Word from Morgane</a></li>
                        <li><a href="/" className=" transition">Our commitments</a></li>
                        <li><a href="/" className=" transition">Legal Notices</a></li>
                        <li><a href="/" className=" transition">Privacy Policy</a></li>
                        <li><a href="/" className=" transition">Terms & Conditions</a></li>
                        <li><a href="/" className=" transition">Digital accessibility</a></li>
                        <li><a href="/" className=" transition">Join us</a></li>
                    </ul>
                </div>
                <div class='hidden lg:block'>
                    <h4 className="text-black text-[15px] mb-7">OUR LOCATIONS</h4>
                    <ul className="space-y-2">
                        <li><a href="/" className=" transition">Our locations</a></li>
                    </ul>
                </div>
                <div class="flex flex-col max-md:items-center max-md:text-center gap-2 ">
                    <h4 className="text-black text-[15px] mb-7">SUBSCRINE TO OUR NEWSLETTER</h4>
                    <div className="flex items-center justify-center gap-4 mt-3">
                        <a href="/"><FaYoutube className='w-5 h-5' /></a>
                        <a href="/"><FaInstagram className='w-5 h-5' /></a>
                        <a href="/"><FaTiktok className='w-5 h-5' /></a>
                        <a href="/"><FaFacebook className='w-5 h-5' /></a>
                        <a href="/"><FaTwitter className='w-5 h-5' /></a>
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Link to="/" className="flex items-center " >
                    <h1 className='logo-font  text-black'>
                        NgXinh
                    </h1>
                </Link>
                <p className='mt-6'>Certified B-corp and Société à Mission</p>
            </div>
        </footer >
    )
}

export default Footer
