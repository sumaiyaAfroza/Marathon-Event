import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet';
// import { format, parseISO, isBefore, isAfter } from 'date-fns';

const DetailsMarathon = () => {
    const { id } = useParams();
    // const navigate = useNavigate();
    const [singleMarathonData, setSingleMarathonData] = useState({});
    // console.log(singleMarathonData)
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

    const { 
        title ,
        _id,
        location ,
        distance ,
        description ,
        image,
        startRegDate ,
        endRegDate ,
        marathonStartDate ,
        totalRegistration,

    } = singleMarathonData;

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER}/marathon/${id}`)
            .then(res => setSingleMarathonData(res.data))
            .catch(err => console.error('Error fetching data:', err));
    }, [id]);

    // Countdown timer
    useEffect(() => {
        const calculateTimeLeft = () => {
            const marathonDate = new Date(marathonStartDate);
            const now = new Date();
            const difference = marathonDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [marathonStartDate]);

    // Check registration status
    useEffect(() => {
        const now = new Date();
        const startDate = new Date(startRegDate);
        const endDate = new Date(endRegDate);
        setIsRegistrationOpen(now >= startDate && now <= endDate);
    }, [startRegDate, endRegDate]);


    

    return (
        <div className="max-w-2xl mx-auto p-4">
            <Helmet>
                <title>Marathon Details</title>
            </Helmet>
            {/* Title and Description */}
            <img src={image} alt="" />
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <p className="text-gray-600 mb-4">{description}</p>
            
            {/* Location and Distance */}
            <div className="flex items-center mb-2">
                <span className="text-gray-700">{location}</span>
            </div>
            <div className="flex items-center mb-6">
                <span className="font-medium">Distance: {distance}</span>
            </div>
            
            {/* Registration Count */}
            <div className="border-t border-b border-gray-200 py-4 my-4">
                <p className="font-semibold">
                    Total Registrations Count: {totalRegistration}
                </p>
            </div>
            
            {/* Dates Section */}
            <div className="space-y-2 mb-6">
    <div>
        <span className="text-sm text-gray-500">Registration Start: </span>
        <span>{startRegDate && format(new Date(startRegDate), 'dd MMM yyyy, hh:mm a')}</span>
    </div>
    <div>
        <span className="text-sm text-gray-500">Registration End: </span>
        <span>{endRegDate && format(new Date(endRegDate), 'dd MMM yyyy, hh:mm a')}</span>
    </div>
    <div>
        <span className="text-sm text-gray-500">Marathon Start: </span>
        <span>{marathonStartDate && format(new Date(marathonStartDate), 'dd MMM yyyy, hh:mm a')}</span>
    </div>
</div>
            
            {/* Countdown Timer */}
            <div className="bg-white dark:bg-gray-900   p-4 rounded-lg mb-6">
                <h3 className="font-medium mb-3">Time left to start Marathon</h3>
                <div className="flex justify-between">
                    <div className="text-center">
                        <div className="text-xl font-bold">{timeLeft.days}</div>
                        <div className="text-sm">Days</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-bold">{timeLeft.hours}</div>
                        <div className="text-sm">Hours</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-bold">{timeLeft.minutes}</div>
                        <div className="text-sm">Minutes</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-bold">{timeLeft.seconds}</div>
                        <div className="text-sm">Seconds</div>
                    </div>
                </div>
            </div>
            
            {/* Register Button */}
             {isRegistrationOpen ? (
                <Link
                    to={`/marathonRegister/${id}`}
                    className="block w-full py-2 px-4 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 text-center"
                >
                    Register Now
                </Link>
            ) : (
                <button
                    disabled
                    className="w-full py-2 px-4 rounded-md font-medium bg-gray-300 text-gray-500 cursor-not-allowed"
                >
                    Registration Closed
                </button>
            )}
        </div>
    );
};

export default DetailsMarathon;