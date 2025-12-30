import React, { useContext, useState } from 'react'
import { RiArrowLeftWideFill } from "react-icons/ri";
import { Link, Outlet } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Sidebar from '../Components/account/sidebar';

const Account = () => {
    const { getCartTotal } = useContext(AppContext)
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div>
            <div className="hidden lg:block bg-[url('src/assets/bg_account.jfif')] bg-no-repeat bg-cover h-[250px] bg-center">
                <div className='flex justify-between text-white pt-8 px-4 lg:px-16'>
                    <Link to={'/'} className='flex gap-2'>
                        <RiArrowLeftWideFill />
                        CONTINUE SHOPPING
                    </Link>
                    <div className='text-center'>
                        <h1 className="logo-font">NgXinh</h1>
                        <h1 className='text-[150px]'>MY ACCOUNT</h1>
                    </div>
                    <Link to={'/cart'} aria-label="Cart" className='relative cursor-pointer transition-opacity hover:opacity-80'>
                        <svg width="30" height="30" viewBox="0 0 14 14" fill="none">
                            <path
                                d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className='absolute -top-2 -right-3 inline-flex items-center justify-center text-[10px] leading-none w-[18px] h-[18px]'>
                            {getCartTotal()}
                        </span>
                    </Link>
                </div>
            </div>

            <div className="lg:hidden bg-gray-50 border-b">
                <div className='flex items-center justify-between px-4 py-4'>
                    <button
                        className='flex items-center transition-colors duration-300'
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Open menu"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <h1 className="logo-font text-xl">MY ACCOUNT</h1>

                    <Link to={'/cart'} aria-label="Cart" className='relative cursor-pointer transition-opacity hover:opacity-80'>
                        <svg width="24" height="24" viewBox="0 0 14 14" fill="none">
                            <path
                                d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className='absolute -top-2 -right-3 inline-flex items-center justify-center text-[10px] leading-none w-[18px] h-[18px] bg-black text-white rounded-full'>
                            {getCartTotal()}
                        </span>
                    </Link>
                </div>
            </div>

            <div
                className={`fixed top-0 left-0 w-full h-screen bg-white z-50 flex flex-col lg:hidden transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className='flex items-center justify-between px-4 py-4 border-b'>
                    <h2 className='text-lg font-semibold'>Menu</h2>
                    <button
                        className="p-2"
                        onClick={() => setIsMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <div className='flex-1 overflow-y-auto p-4'>
                    <Sidebar />
                </div>

                <div className='p-4 border-t'>
                    <Link
                        to={'/'}
                        className='flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-black transition-colors'
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <RiArrowLeftWideFill />
                        CONTINUE SHOPPING
                    </Link>
                </div>
            </div>

            {isMenuOpen && (
                <div
                    className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            <div className='px-4 py-6 lg:py-8 flex gap-4 lg:gap-8 max-w-7xl mx-auto'>
                <div className='hidden lg:block lg:w-1/5'>
                    <Sidebar />
                </div>

                <div className='flex-1 w-full lg:w-4/5'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Account