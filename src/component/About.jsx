import React, { useState, useEffect } from 'react';
import { FaRunning, FaUsers, FaGlobe, FaRegSmile, FaTrophy, FaHeart, FaClock, FaMapMarkerAlt, FaStar, FaPlay, FaPause } from 'react-icons/fa';

const About = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [counters, setCounters] = useState({ runners: 0, events: 0, members: 0, satisfaction: 0 });

  const aboutData = [
    {
      title: "Our Mission",
      description:
        "Our mission is to create a dynamic, user-friendly platform that empowers marathon enthusiasts, event organizers, and sponsors to connect seamlessly. We aim to simplify the marathon registration and management process, provide real-time event updates, and ensure that participants have access to all essential information before, during, and after the race.",
      icon: <FaRunning className="text-blue-600 dark:text-blue-400 text-4xl mb-3" />,
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "Our Vision",
      description:
        "Our vision is to become the leading global hub for marathon events, recognized for innovation, reliability, and inclusivity. We envision a world where every runner, regardless of location or experience level, has equal access to participate in well-organized and inspiring marathons through advanced technology.",
      icon: <FaGlobe className="text-green-600 dark:text-green-400 text-4xl mb-3" />,
      gradient: "from-green-500 to-teal-600"
    },
    {
      title: "Why Choose Us?",
      description:
        "We prioritize user experience, offering a streamlined and secure registration process, personalized event recommendations, and tools to track your progress. Our platform supports both amateur and professional runners with comprehensive features and organizer-friendly tools.",
      icon: <FaUsers className="text-orange-600 dark:text-orange-400 text-4xl mb-3" />,
      gradient: "from-orange-500 to-red-600"
    },
  ];

  const stats = [
    { label: "Active Runners", value: 12000, suffix: "+", icon: <FaRunning className="text-2xl" /> },
    { label: "Events Hosted", value: 350, suffix: "+", icon: <FaGlobe className="text-2xl" /> },
    { label: "Community Members", value: 25000, suffix: "+", icon: <FaUsers className="text-2xl" /> },
    { label: "Satisfaction Rate", value: 98, suffix: "%", icon: <FaRegSmile className="text-2xl" /> },
  ];

  const features = [
    { icon: <FaTrophy />, title: "Achievement Tracking", desc: "Monitor your progress and celebrate milestones" },
    { icon: <FaClock />, title: "Real-time Updates", desc: "Get live race updates and notifications" },
    { icon: <FaMapMarkerAlt />, title: "GPS Integration", desc: "Track routes and find nearby events" },
    { icon: <FaHeart />, title: "Health Monitoring", desc: "Connect with fitness trackers and health apps" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marathon Runner",
      text: "This platform changed my running experience completely. The community support is incredible!",
      rating: 5,
      image: "🏃‍♀️"
    },
    {
      name: "Mike Chen",
      role: "Event Organizer",
      text: "Managing our marathon events has never been easier. The dashboard is intuitive and powerful.",
      rating: 5,
      image: "👨‍💼"
    },
    {
      name: "Lisa Rodriguez",
      role: "Fitness Enthusiast",
      text: "I love how easy it is to discover new marathons and connect with fellow runners worldwide.",
      rating: 5,
      image: "🌟"
    }
  ];

  // Animated counter effect
  useEffect(() => {
    const animateCounters = () => {
      stats.forEach((stat, index) => {
        let start = 0;
        const increment = stat.value / 100;
        const timer = setInterval(() => {
          start += increment;
          setCounters(prev => ({
            ...prev,
            [index === 0 ? 'runners' : index === 1 ? 'events' : index === 2 ? 'members' : 'satisfaction']: Math.min(Math.round(start), stat.value)
          }));
          if (start >= stat.value) clearInterval(timer);
        }, 20);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });

    const statsElement = document.getElementById('stats-section');
    if (statsElement) observer.observe(statsElement);

    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'} text-sm`} />
    ));
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 min-h-screen transition-all duration-500">
      
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-pulse"></div>
        <div className="relative text-center py-20 px-6">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl mb-6 animate-bounce">
              <FaRunning className="text-white text-3xl" />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6 tracking-tight">
            About Our Platform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Welcome to the future of marathon management—where runners, organizers, and communities unite 
            to create extraordinary racing experiences powered by cutting-edge technology.
          </p>
        </div>
      </div>

      {/* Animated Stats Section */}
      <div id="stats-section" className="px-6 md:px-20 lg:px-32 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 rounded-2xl shadow-xl p-8 flex flex-col items-center hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-white/50 dark:border-gray-700/50"
            >
              <div className="text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {Object.values(counters)[idx]}{stat.suffix}
              </div>
              <div className="text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Content Cards */}
      <div className="px-6 md:px-20 lg:px-32 mb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {aboutData.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-white/90 backdrop-blur-sm dark:bg-gray-900/90 p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/50 dark:border-gray-700/50"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Features Section */}
      <div className="px-6 md:px-20 lg:px-32 mb-16">
        <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Platform Features
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 dark:border-gray-700/50">
              <div className="text-3xl text-blue-600 dark:text-blue-400 mb-4">{feature.icon}</div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{feature.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div className="px-6 md:px-20 lg:px-32 mb-16">
        <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          What Our Community Says
        </h3>
        <div className="max-w-2xl mx-auto">
          <div className={`bg-white/90 backdrop-blur-sm dark:bg-gray-900/90 p-8 rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 transition-all duration-500 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="text-center">
              <div className="text-6xl mb-4">{testimonials[currentTestimonial].image}</div>
              <div className="flex justify-center mb-4">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>
              <p className="text-xl italic text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </p>
              <div>
                <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-blue-600 dark:text-blue-400">{testimonials[currentTestimonial].role}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonial(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentTestimonial ? 'bg-blue-600 scale-125' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Call to Action */}
      <div className="px-6 md:px-20 lg:px-32 pb-20">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <FaRunning className="text-2xl" />
            </div>
            <h4 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h4>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of runners who have transformed their marathon experience with our platform. 
              Start your adventure today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/register"
                className="group inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Get Started Now
                <FaRunning className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href="/events"
                className="inline-flex items-center border-2 border-white/50 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all duration-300"
              >
                Browse Events
                <FaGlobe className="ml-2" />
              </a>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full animate-pulse delay-1000"></div>
        </div>
      </div>
      
    </div>
  );
};

export default About;