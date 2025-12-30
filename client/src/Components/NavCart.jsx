import React, { useContext } from 'react'
import { Link, useLocation } from "react-router-dom";
import { RiArrowLeftWideFill } from "react-icons/ri";
import { TfiLayoutLineSolid } from "react-icons/tfi";

const NavCart = () => {
    const location = useLocation();
    const isCartPage = location.pathname === '/cart';
    const isShippingPage = location.pathname === '/shipping';

    return (
        <div>
            <div className='flex justify-between'>
                <Link
                    to={'/'}
                    className='flex items-center gap-2'
                >
                    <RiArrowLeftWideFill />
                    CONTINUE SHOPPING
                </Link>
                <Link to={'/account/orders'}>
                    ACCOUNT
                </Link>
            </div>

            <div className='flex justify-center items-center gap-3'>
                <Link
                    to={'/cart'}
                    className={`transition-colors ${isCartPage
                        ? 'underline text-black font-semibold'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Cart
                </Link>
                <TfiLayoutLineSolid className="text-gray-400" />
                <Link
                    to={'/shipping'}
                    className={`transition-colors ${isShippingPage
                        ? 'underline text-black font-semibold'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Shipping
                </Link>
            </div>
        </div>
    )
}

export default NavCart