import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const banners = [
    {
        
        id: 1,
        image: 'https://i.ibb.co/yFWNCzw1/MARATHON-TRAINING-header.png',
        alt: 'Marathon Event',
        title: 'Join Our Upcoming Marathon!',
        subtitle: 'Run for a cause. Connect, compete, and celebrate with the community.',
        buttonText: 'Join Marathon'





        
    },
    {
        id: 2,
        image: 'https://i.ibb.co.com/8gyGmkrH/Getty-Images-892658004-dd95e506848d4aad9ab3f5f3129fe685.jpg',
        alt: 'Found Wallet',
        title: 'Every Step Counts',
        subtitle: 'Train, track, and triumph in your own way. Whether it’s 5K or 42K, you’re a champion.',
        buttonText: 'Start Training',
    },
    {
        id: 3,
        image: 'https://i.ibb.co.com/h1BRdPt6/last5.jpg',
        alt: 'Lost Pet',
        title: 'Finish Line Awaits',
        subtitle:  'Celebrate every mile with the community. Achieve your personal best and go beyond.',
        buttonText: 'Explore Events'
    },
    {
        id: 4,
        image: 'https://i.ibb.co.com/m5995Ktj/02-CONVOwomen1-jumbo.jpg',
        alt: 'Lost Keys',
        title: 'Run for a Cause',
        subtitle: 'Join our global marathon movement and support health, education, and community building.',
        buttonText: 'join the Race'
    },
];

export default function Banner() {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(interval);
    }, [isPaused]);

    // const prevSlide = () => setCurrent(current === 0 ? banners.length - 1 : current - 1);
    // const nextSlide = () => setCurrent(current === banners.length - 1 ? 0 : current + 1);

    return (
        <div
            className="relative w-full h-[700px] aspect-video overflow-hidden rounded-xl shadow-2xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {banners.map((banner, index) => (
                <div
                    key={banner.id}
                    className={`absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out ${
                        index === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
                    }`}
                >
                    <img
                        src={banner.image}
                        alt={banner.alt}
                        className="w-full h-full object-cover brightness-75"
                        draggable={false}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                        <div className="relative max-w-3xl px-4">
                            <h2
                                className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-2xl ${
                                    index === current ? 'animate-slideIn' : ''
                                }`}
                            >
                                {banner.title}
                            </h2>
                            <p
                                className={`text-lg sm:text-xl md:text-2xl font-medium mb-8 drop-shadow-lg ${
                                    index === current ? 'animate-slideIn' : ''
                                }`}
                            > 
                                {banner.subtitle}
                            </p>
                            <div className="text-center">
                                <button
                                    className={`px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 ${
                                        index === current ? 'animate-bounceIn' : ''
                                    }`}
                                >
                                    {banner.buttonText || 'Find Now'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Slide Controls (uncomment if needed) */}
            {/* <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900/90 p-4 rounded-full text-white z-20 transition-all duration-300 hover:scale-110 shadow-md"
                aria-label="Previous slide"
            >
                <ChevronLeftIcon className="w-8 h-8" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900/90 p-4 rounded-full text-white z-20 transition-all duration-300 hover:scale-110 shadow-md"
                aria-label="Next slide"
            >
                <ChevronRightIcon className="w-8 h-8" />
            </button> */}

            {/* Indicator Dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 shadow-sm ${
                            index === current
                                ? 'bg-blue-500 scale-150'
                                : 'bg-gray-300/60 hover:bg-gray-200/80'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Animation Styles */}
            <style>
                {`
                    @keyframes slideIn {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    @keyframes bounceIn {
                        from {
                            opacity: 0;
                            transform: scale(0.8);
                        }
                        to {
                            opacity: 1;
                            transform: scale(1);
                        }
                    }
                    .animate-slideIn {
                        animation: slideIn 0.8s ease-out;
                    }
                    .animate-bounceIn {
                        animation: bounceIn 0.6s ease-out;
                    }
                `}
            </style>
        </div>
    );
}