import React from 'react'
import { NavLink } from 'react-router-dom'
import { RiArrowRightWideFill } from "react-icons/ri";
import { CiCircleInfo, CiHeart } from "react-icons/ci";
import { FaBoxArchive } from "react-icons/fa6";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";

const Sidebar = () => {
    const menuItems = [
        { name: 'My Information', path: 'information', icon: <CiCircleInfo className="w-5 h-5" /> },
        { name: 'My Orders', path: 'orders', icon: <MdOutlineShoppingBag className="w-5 h-5" /> },
        { name: 'My Returns', path: 'returns', icon: <FaBoxArchive className="w-5 h-5" /> },
        { name: 'My Wishlish', path: 'wishlist', icon: <CiHeart className="w-5 h-5" /> },
        { name: 'My Alerts', path: 'alerts', icon: <FaRegBell className="w-5 h-5" /> },
    ]
    return (
        <div>
            {menuItems.map((item) => (
                <NavLink className={({ isActive }) => `flex items-center justify-between rounded-lg  py-2.5 mb-1 gap-3 transition-colors
                        ${isActive
                        ? 'text-black '
                        : 'text-gray-400 '}`}
                    key={item.name}
                    to={item.path}
                    end={item.path === ''}
                >
                    <div className='flex items-center gap-2'>
                        <span >
                            {item.icon}
                        </span>
                        <span >{item.name}</span>
                    </div>
                    <RiArrowRightWideFill />
                </NavLink>
            ))}
        </div>
    )
}

export default Sidebar