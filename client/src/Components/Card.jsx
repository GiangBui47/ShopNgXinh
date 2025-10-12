import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/asset.js'

const Card = ({ name, index, height = "h-[300px]" }) => {
    const categoryImage = assets[name.category_image]

    return (
        <div className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
            <Link to={`/collection/${name.category_name.toLowerCase()}`} className="relative block">
                <img
                    src={categoryImage}
                    alt={name.category_name}
                    className={`w-full ${height} object-cover hover:scale-105 transition-transform duration-300`}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
                    <h2 className="text-2xl font-semibold text-white">{name.category_name}</h2>
                    <p className="text-white text-sm mt-2">{name.category_description}</p>
                </div>
            </Link>
        </div>
    )
}

export default Card