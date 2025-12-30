import React, { useState } from 'react'

const Information = () => {
    const [value, setValue] = useState('Giang');
    return (
        <div>
            <div className='flex justify-between border-b border-gray-300 pb-4 mb-6'>
                <div>
                    <h2>My Information</h2>
                    <p className='mt-2'>Account:</p>
                </div>
                <div className='flex flex-col space-y-3'>
                    <button className='border border-gray-400 px-3 py-4 cursor-pointer hover:border-black transition-all'>
                        CHANGE MY EMAIL
                    </button>
                    <button className='border border-gray-400 px-3 py-4 cursor-pointer hover:border-black transition-all'>
                        CHANGE MY PASSWORD
                    </button>
                </div>
            </div>
            <div className='border-b border-gray-300 mb-6 pb-4'>
                <div className='grid grid-cols-2 gap-5'>
                    <div className="relative border border-gray-800 bg-white">
                        <label
                            htmlFor="firstName"
                            className="absolute -top-3 left-4 bg-white px-1 text-sm text-gray-700"
                        >
                            First Name*
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="w-full px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gray-800"
                            placeholder=""
                        />
                    </div>
                    <div className="relative border border-gray-800 bg-white">
                        <label
                            htmlFor="lastName"
                            className="absolute -top-3 left-4 bg-white px-1 text-sm text-gray-700"
                        >
                            Last Name*
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="w-full px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gray-800"
                            placeholder=""
                        />
                    </div>
                    <div className="relative border border-gray-800 bg-white">
                        <label
                            htmlFor="birthday"
                            className="absolute -top-3 left-4 bg-white px-1 text-sm text-gray-700"
                        >
                            Birthday*
                        </label>
                        <input
                            id="birthday"
                            type="date"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="w-full px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gray-800"
                            placeholder=""
                        />
                    </div>
                    <div className="relative border border-gray-800 bg-white">
                        <label
                            htmlFor="phone"
                            className="absolute -top-3 left-4 bg-white px-1 text-sm text-gray-700"
                        >
                            Phone*
                        </label>
                        <input
                            id="phone"
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="w-full px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gray-800"
                            placeholder=""
                        />
                    </div>
                </div>
                <button className='px-16 lg:px-28 py-4 border border-gray-300 bg-gray-500 
                text-white text-center mt-8'>
                    CONFIRM
                </button>
            </div>

            <div>
                <div>
                    <h2>DELIVERY ADDRESS</h2>
                    <p className='mt-2'>To view and easily edit your delivery addresses.</p>
                </div>


            </div>

        </div>
    )
}

export default Information
