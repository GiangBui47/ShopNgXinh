import React from 'react'

const Visa = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className='space-y-4 mt-5'>
            <div className='space-y-2'>
                <p>Card Number</p>
                <input type="text" placeholder='Card Number'
                    className='border border-black px-2 py-2 w-full placeholder:text-black placeholder:font-[100] ' />
            </div>
            <div className='space-y-2'>
                <p>Expiry Date</p>
                <div className='flex space-x-2'>
                    <select className='border border-black px-2 py-2 w-1/2 placeholder:text-black placeholder:font-[100] '>
                        <option value="">Month</option>
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                {String(i + 1).padStart(2, '0')}
                            </option>
                        ))}
                    </select>
                    <select className='border border-black px-2 py-2 w-1/2 placeholder:text-black placeholder:font-[100] '>
                        <option value="">Year</option>
                        {Array.from({ length: 11 }, (_, i) => {
                            const year = currentYear + i;
                            return (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <div className='space-y-2'>
                <p>Security code</p>
                <input type="text" placeholder='CVV'
                    className='border border-black px-2 py-2 w-full placeholder:text-black placeholder:font-[100] ' />
            </div>
        </div>
    )
}

export default Visa