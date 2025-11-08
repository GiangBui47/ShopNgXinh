import React, { useContext } from 'react'
import NavCart from '../Components/NavCart'
import { AppContext } from '../context/AppContext'
import { assets, product_images, product_inventory } from '../assets/asset';
import { FaRegTrashAlt } from "react-icons/fa";

const Cart = () => {
    const { products, cartItems, removeToCart } = useContext(AppContext);

    const getProductById = (productId) => {
        return products.find(p => p.product_id === productId);
    };

    const getImage = (productId, color) => {
        const objColor = product_inventory.filter(item => item.product_id === productId && item.color === color);
        if (objColor.length > 0) {
            const primaryImage = product_images.find(img => img.color_code === objColor[0].color_code);
            return primaryImage.image_url
        }
        return 'default-product-image.jpg';
    };

    const totalPrice = cartItems.reduce((sum, item) => {
        const product = getProductById(item.product_id);
        return sum + (product?.price * item.quantity || 0);
    }, 0);


    return (
        <div className="pt-8 px-4 lg:px-16">
            <NavCart />
            <div className='mt-5 flex lg:flex-row flex-col relative items-start'>
                <div className='w-full lg:w-2/3'>
                    <h4>Shopping Cart</h4>
                    {cartItems.length === 0 ? (
                        <p className='mt-5 text-gray-500'>Giỏ hàng trống.</p>
                    ) : (
                        cartItems.map((cartItem, index) => {
                            const product = getProductById(cartItem.product_id);
                            if (!product) return null;

                            return (
                                <div key={`${cartItem.product_id}-${cartItem.color}-${cartItem.size}`} className='mt-5 border-t border-gray-300 max-w-[700px]'>
                                    <div className='flex mt-5 justify-between'>
                                        <div className='flex'>
                                            <img
                                                src={assets[getImage(cartItem.product_id, cartItem.color)]}
                                                alt={product.product_name}
                                                className='w-[150px] h-[150px] object-cover'
                                            />
                                            <div className='ms-4 space-y-1'>
                                                <h4>{product.product_name}</h4>
                                                <p className='text-[#555555]'>Color: {cartItem.color}</p>
                                                <p className='text-[#555555]'>Size: {cartItem.size}</p>
                                                <p className='text-[#555555]'>Qty: {cartItem.quantity}</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center'>
                                            <h4 className='me-15'>${product.price?.toFixed(2) || 'Price'}</h4>
                                            <FaRegTrashAlt
                                                className='cursor-pointer ml-2'
                                                onClick={() => removeToCart(cartItem.product_id, cartItem.color, cartItem.size)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
                <div className='w-full lg:w-1/3 border px-3 py-3 lg:px-5 lg:py-5'>
                    <div className='space-y-2'>
                        <div className='flex items-center justify-between'>
                            <h5>SUBTOTAL </h5>
                            <p>${totalPrice.toFixed(2)}</p>
                        </div>
                        <h5>VOUCHER</h5>
                        <div className='flex items-center justify-between'>
                            <h5>TOTAL ITEM </h5>
                            <p>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</p>
                        </div>
                        <div className='items-center flex justify-between'>
                            <h3 className='font-bold'>TOTAL </h3>
                            <h3>${totalPrice.toFixed(2)}</h3>
                        </div>
                        <button className='border bg-black items-center text-white w-full py-3 mt-6'>
                            ORDER
                        </button>

                        <div className='flex w-full'>
                            <input type="text" placeholder='Gift Card' className='border border-gray-300 px-2 py-2 w-2/3' />
                            <button type="submit" className='border border-gray-300 px-2 py-2 w-1/3'>OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;