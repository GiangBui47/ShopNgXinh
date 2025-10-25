import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/asset.js';
import { toUrlSlug } from '../utils';

const Card = ({ name, index, height = "h-[300px]", onClick }) => {
    const categoryImage = assets[name.category_image]

    const pathname = name.category_id !== 1
        ? `/collection/${toUrlSlug(name.category_name)}`
        : '/collection';

    const handleClick = (e) => {
        if (onClick) {
            e.preventDefault();
            onClick(name);
        }
    };

    return (
        <div className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
            <Link
                to={pathname}
                className="relative block cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                onClick={handleClick}
                aria-label={`View ${name.category_name} category: ${name.category_description}`}
            >
                <img
                    src={categoryImage}
                    alt={name.category_name}
                    loading="lazy"
                    className={`w-full ${height} object-cover hover:scale-105 transition-transform duration-300`}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 px-4">
                    <h2 className="text-xl sm:text-2xl font-semibold text-white text-center">
                        {name.category_name}
                    </h2>
                    <p className="text-white text-xs sm:text-sm mt-2 text-center leading-relaxed max-w-[80%] truncate">
                        {name.category_description}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default Card;