import React, { useContext, useState } from 'react'
import NavCart from '../Components/NavCart'
import { AppContext } from '../context/AppContext';
import { assets, product_images, product_inventory } from '../assets/asset';
import { FaCcPaypal, FaCcVisa, FaGooglePay } from "react-icons/fa";
import Visa from '../Components/Visa';

const Shipping = () => {
    const { products, cartItems, removeToCart } = useContext(AppContext);
    const [openPayment, setOpenPayment] = useState('visa');


    const getProductById = (productId) => {
        return products.find(p => p.product_id === productId);
    };

    const getImage = (productId, color) => {
        const objColor = product_inventory.filter(item => item.product_id === productId && item.color === color);
        if (objColor.length > 0) {
            const primaryImage = product_images.find(img => img.color_code === objColor[0].color_code);
            return primaryImage?.image_url || 'default-product-image.jpg';
        }
        return 'default-product-image.jpg';
    };

    const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

    const totalPrice = cartItems.reduce((sum, item) => {
        const product = getProductById(item.product_id);
        const itemQuantity = item.quantity || 0;
        const subtotal = (product?.price || 0) * itemQuantity;
        return sum + subtotal;
    }, 0);

    const getButtonText = () => {
        switch (openPayment) {
            case 'visa':
                return 'Pay and Place Order';
            case 'paypal':
                return 'Pay with PayPal';
            case 'googlepay':
                return 'Pay with Google Pay';
            default:
                return 'Pay and Place Order';
        }
    };

    return (
        <div className="pt-8 px-4 lg:px-16">
            <NavCart />
            <div className='px-10 mt-10'>
                <div>
                    <div className='grid grid-cols-[3fr_3fr] border px-3 py-4 text-white bg-black h-[60px] items-center'>
                        <h3>Order Summary</h3>
                        <div className='grid grid-cols-[1fr_1fr_1fr] text-center'>
                            <h4>Quantity</h4>
                            <h4>Price</h4>
                            <h4>Total</h4>
                        </div>
                    </div>

                    {cartItems.length === 0 ? (
                        <p className="text-center py-4">Your cart is empty.</p>
                    ) : (
                        <>
                            {cartItems.map((cartItem) => {
                                const product = getProductById(cartItem.product_id);
                                if (!product) return null;

                                const itemQuantity = cartItem.quantity || 0;
                                const subtotal = (product.price || 0) * itemQuantity;

                                return (
                                    <div key={`${cartItem.product_id}-${cartItem.color}-${cartItem.size}`} className="grid grid-cols-[3fr_3fr] items-center border-b py-4">
                                        <div>
                                            <div className='flex items-center'>
                                                <img
                                                    src={assets[getImage(cartItem.product_id, cartItem.color)]}
                                                    alt={product.product_name}
                                                    className='w-[150px] h-[150px] object-cover'
                                                />
                                                <div className='ms-4 space-y-1'>
                                                    <h3>{product.product_name}</h3>
                                                    <p className='text-[#555555]'>Color: {cartItem.color}</p>
                                                    <p className='text-[#555555]'>Size: {cartItem.size}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-[1fr_1fr_1fr] text-center items-center'>
                                            <h5>{itemQuantity}</h5>
                                            <h5>${product.price}</h5>
                                            <h5>${subtotal.toFixed(2)}</h5>
                                        </div>
                                    </div>
                                );
                            })}

                            <div className='text-end mt-3'>
                                <h3>Item Total: ${totalPrice.toFixed(2)}</h3>
                            </div>
                        </>
                    )}
                </div>

                <div className='mt-10'>
                    <div className='flex '>
                        <div className='w-1/2'>
                            <div className='border px-8 py-4 bg-black text-white h-[60px] flex items-center'>
                                <h3>ADDRESS</h3>
                            </div>
                            <div className='px-8 py-5 border border-gray-300 space-y-5'>
                                <div className='space-y-2'>
                                    <p>First Name</p>
                                    <input type="text" placeholder='First Name'
                                        className='border border-black px-2 py-4 w-full placeholder:text-black placeholder:font-[100] ' />
                                </div>
                                <div className='space-y-2'>
                                    <p>Last Name</p>
                                    <input type="text" placeholder='Last Name'
                                        className='border border-black px-2 py-4 w-full placeholder:text-black placeholder:font-[100] ' />
                                </div>
                                <div className='space-y-2'>
                                    <p>Phone</p>
                                    <input type="text" placeholder='Phone'
                                        className='border border-black px-2 py-4 w-full placeholder:text-black placeholder:font-[100] ' />
                                </div>
                                <div className='space-y-2'>
                                    <p>Address</p>
                                    <input type="text" placeholder='Address'
                                        className='border border-black px-2 py-4 w-full placeholder:text-black placeholder:font-[100] ' />
                                </div>
                            </div>
                        </div>

                        <div className='ms-16 lg:ms-36 w-1/2'>
                            <div className='border px-8 py-4 bg-black text-white h-[60px] flex items-center justify-between '>
                                <h3>PAYMENT</h3>
                                <h5>Secure Encrypted Transaction</h5>
                            </div>
                            <p className='mt-4 ms-8'>Please choose payment method</p>
                            <div className='flex items-center gap-5 mt-5 justify-center'>
                                <button className={`w-[50px] h-[50px] text-xl lg:w-[100px] lg:h-[100px] lg:text-2xl border cursor-pointer ${openPayment === 'paypal' ? 'border-gray-950' : 'text-gray-300 border-gray-400'}`}
                                    onClick={() => setOpenPayment('paypal')} >
                                    Paypal
                                </button>
                                <button className={`w-[50px] h-[50px] text-xl lg:w-[100px] lg:h-[100px] lg:text-2xl border cursor-pointer ${openPayment === 'visa' ? 'border-gray-950' : 'text-gray-300 border-gray-400'}`}
                                    onClick={() => setOpenPayment('visa')} >
                                    Visa
                                </button>
                                <button className={`w-[50px] h-[50px] text-xl lg:w-[100px] lg:h-[100px] lg:text-2xl borde cursor-pointer ${openPayment === 'googlepay' ? 'border-gray-950' : 'text-gray-300 border-gray-400'}`}
                                    onClick={() => setOpenPayment('googlepay')} >
                                    Google Pay
                                </button>
                            </div>
                            <div className='px-16'>
                                {openPayment === 'visa' && <Visa />}
                                {openPayment === 'paypal' && (
                                    <div className='mt-4 space-y-4'>
                                        <p>PayPal Payment</p>
                                    </div>
                                )}
                                {openPayment === 'googlepay' && (
                                    <div className='mt-4 space-y-4'>
                                        <p>Google Pay</p>
                                    </div>
                                )}
                            </div>
                            <div className='mt-8 lg:mt-16 border px-4 py-8 border-gray-300'>
                                <p className='px-4'>By clicking on 'Pay and Place Order', you agree(i)
                                    to make your purchase from Global-e as merchant of record for this transaction, subject to Global-e's <a className='text-blue-400'>Terms of sale</a>;
                                    (ii) that your information will be handled by Global-e in accordance with the
                                    Global-e <a className='text-blue-400'>Privacy Policy</a>; and (iii) that Global-e will
                                    share your information (excluding the payment details) with Sezane</p>

                                <button className='bg-black text-white px-4 py-3 w-full mt-6'>
                                    {getButtonText()}
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shipping  