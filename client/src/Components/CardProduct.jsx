import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/asset';

const CardProduct = ({ product }) => {
    const image = assets[product.image];

    const colors = product.color || [];
    const sizes = product.size || [];

    const defaultColor = colors[0] || '';

    return (
        <div className='w-full max-w-sm mx-auto '>
            <div className='relative overflow-hidden group'>
                <Link to={`/product/${product.sku}${defaultColor ? `?color=${encodeURIComponent(defaultColor)}` : ''}`}>
                    <img
                        src={image}
                        alt={product.alt_text || product.product_name}
                        className='w-full h-150 object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                </Link>
                <button className='absolute top-2 right-2 bg-white rounded-full p-2 shadow-md opacity-80 hover:opacity-100 transition-opacity z-10'>
                    <svg className='w-5 h-5 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                    </svg>
                </button>

                <div className='absolute bottom-4 left-4 right-4 bg-white p-4 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10'>
                    <div className='flex justify-between items-start mb-2'>
                        <Link to={`/product/${product.sku || product.product_id}${defaultColor ? `?color=${encodeURIComponent(defaultColor)}` : ''}`} className='text-lg font-semibold text-gray-900 hover:text-gray-700 transition-colors block flex-1 pr-2'>
                            {product.product_name}
                        </Link>
                        <span className='text-xl font-bold text-gray-900 whitespace-nowrap'>
                            ${product.price?.toFixed(2) || 'N/A'}
                        </span>
                    </div>

                    {colors.length > 0 && (
                        <p className='text-sm text-gray-600 mb-2'>
                            Available in{' '}
                            <span className='font-medium'>
                                {colors.map((color, i) => (
                                    <Link
                                        to={`/product/${product.sku || product.product_id}?color=${encodeURIComponent(color)}`}
                                        key={i}
                                        className='ml-1 cursor-pointer transition-colors text-gray-700 hover:text-black'
                                    >
                                        {color}
                                        {i < colors.length - 1 && ' |'}
                                    </Link>
                                ))}
                            </span>
                        </p>
                    )}

                    {sizes.length > 0 && (
                        <div className='flex flex-wrap gap-1 mb-4'>
                            {sizes.map((size, i) => (
                                <span key={i} className='px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded-full cursor-pointer hover:bg-gray-200 transition-colors'>
                                    {size}
                                </span>
                            ))}
                        </div>
                    )}

                    <Link to={`/product/${product.product_id}${defaultColor ? `?color=${encodeURIComponent(defaultColor)}` : ''}`}>
                        <button className='bg-black text-white py-2 px-4 rounded-full text-sm font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors duration-200 w-full'>
                            Quick Shop
                        </button>
                    </Link>
                </div>
            </div>
            <div className='mt-2 text-center '>
                <p className='text-lg text-gray-500'>
                    <Link
                        to={`/product/${product.sku || product.product_id}${defaultColor ? `?color=${encodeURIComponent(defaultColor)}` : ''}`}
                        className='text-black hover:text-gray-700 transition-colors'
                    >
                        {product.product_name}
                    </Link> - ${product.price?.toFixed(2) || 'N/A'}
                </p>
            </div>
        </div>
    );
};

export default CardProduct;