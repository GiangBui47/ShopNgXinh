import React from 'react';

const Hero = () => {
    return (
        <div
            className="relative flex flex-col items-center justify-center text-white
      bg-[url('src/assets/heroImage.avif')] bg-no-repeat bg-cover bg-center h-screen pt-16"
        >
            <div className="text-center">
                <h1 className="logo-font mb-10">NgXinh x New Balance</h1>
                <button className="border px-10 py-3 text-[15px] text-white hover:bg-white hover:text-black transition-all duration-300">
                    DISCOVER
                </button>
            </div>
        </div>
    );
};

export default Hero;