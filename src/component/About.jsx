import React from "react";
import { FaRunning, FaUsers, FaGlobe, FaRegSmile } from "react-icons/fa";

const About = () => {
  const aboutData = [
    {
      title: "Our Mission",
      description:
        "Our mission is to create a dynamic, user-friendly platform that empowers marathon enthusiasts, event organizers, and sponsors to connect seamlessly. We aim to simplify the marathon registration and management process, provide real-time event updates, and ensure that participants have access to all essential information before, during, and after the race. By bridging the gap between organizers and runners, we seek to promote healthy lifestyles, encourage community participation, and celebrate the spirit of endurance sports.",
      icon: <FaRunning className="text-blue-600 dark:text-blue-400 text-3xl mb-2" />,
    },
    {
      title: "Our Vision",
      description:
        "Our vision is to become the leading global hub for marathon events, recognized for innovation, reliability, and inclusivity. We envision a world where every runner, regardless of location or experience level, has equal access to participate in well-organized and inspiring marathons. Through advanced technology, we aspire to revolutionize the way marathons are discovered, registered, and experienced—making the process more transparent, engaging, and rewarding for everyone involved.",
      icon: <FaGlobe className="text-blue-600 dark:text-blue-400 text-3xl mb-2" />,
    },
    {
      title: "Why Choose Us?",
      description:
        "We prioritize user experience, offering a streamlined and secure registration process, personalized event recommendations, and tools to track your progress. Our platform supports both amateur and professional runners with features like training tips, event reminders, and a dedicated space to share achievements. Organizers benefit from our comprehensive dashboard that simplifies event setup, participant tracking, and payment management—ensuring smoother operations and greater participation.",
      icon: <FaUsers className="text-blue-600 dark:text-blue-400 text-3xl mb-2" />,
    },
  ];

  // Some platform stats for extra professionalism
  const stats = [
    {
      label: "Active Runners",
      value: "12,000+",
      icon: <FaRunning className="text-blue-500 dark:text-blue-300 text-2xl" />,
    },
    {
      label: "Events Hosted",
      value: "350+",
      icon: <FaGlobe className="text-blue-500 dark:text-blue-300 text-2xl" />,
    },
    {
      label: "Community Members",
      value: "25,000+",
      icon: <FaUsers className="text-blue-500 dark:text-blue-300 text-2xl" />,
    },
    {
      label: "Satisfaction Rate",
      value: "98%",
      icon: <FaRegSmile className="text-blue-500 dark:text-blue-300 text-2xl" />,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-6 md:px-20 lg:px-32 min-h-screen transition-colors duration-300">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-blue-800 dark:text-blue-300 mb-4 tracking-tight drop-shadow">
          About Our Platform
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
          Welcome to our Marathon Management System—your ultimate destination for
          discovering, joining, and managing marathon events. Whether you’re an
          experienced athlete or just starting your running journey, our platform
          provides all the tools and resources you need to succeed.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center hover:shadow-lg transition"
          >
            {stat.icon}
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-200 mt-2">
              {stat.value}
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Content Mapping */}
      <div className="grid md:grid-cols-3 gap-8">
        {aboutData.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center text-center border-t-4 border-blue-200 dark:border-blue-900"
          >
            {item.icon}
            <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-200 mb-2 mt-2">
              {item.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <h4 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2">
          Ready to join the movement?
        </h4>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Sign up today and be part of a vibrant, supportive marathon community!
        </p>
        <a
          href="/register"
          className="inline-block bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-700 dark:to-blue-500 text-white px-8 py-3 rounded-full font-bold shadow hover:scale-105 transition"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default About;

