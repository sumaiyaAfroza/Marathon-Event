import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { Loader2, Activity, BarChart3, Users, Calendar } from "lucide-react";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      setError("User email not found");
      return;
    }

    const fetchData = async () => {
      try {
        console.log("Fetching dashboard data for:", user.email);
        
        const [statsRes, activityRes] = await Promise.all([
          fetch(`http://localhost:3000/api/dashboard/stats?email=${user.email}`),
          fetch(`http://localhost:3000/api/dashboard/recent-activity?email=${user.email}`),
        ]);

        console.log("Stats Response Status:", statsRes.status);
        console.log("Activity Response Status:", activityRes.status);

        if (!statsRes.ok || !activityRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const statsData = await statsRes.json();
        const activityData = await activityRes.json();

        console.log("Stats Data:", statsData);
        console.log("Activity Data:", activityData);

        setStats(statsData);
        setActivities(activityData);
        setError(null);
      } catch (error) {
        console.error("Error loading dashboard:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        <p className="ml-3 text-lg font-medium">Loading Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-600 font-semibold text-xl mb-4">
          Failed to load dashboard data
        </p>
        <p className="text-gray-600">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center mt-20 text-red-600 font-semibold">
        No dashboard data available.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800">🏃‍♀️ Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Marathons */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex justify-between items-center border border-gray-200 hover:shadow-xl transition">
          <div>
            <h2 className="text-gray-600 text-lg">Total Marathons</h2>
            <p className="text-3xl font-bold text-blue-600">
              {stats.totalMarathons || 0}
            </p>
          </div>
          <BarChart3 className="w-10 h-10 text-blue-400" />
        </div>

        {/* My Created Marathons */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex justify-between items-center border border-gray-200 hover:shadow-xl transition">
          <div>
            <h2 className="text-gray-600 text-lg">My Created Marathons</h2>
            <p className="text-3xl font-bold text-green-600">
              {stats.myMarathons || 0}
            </p>
          </div>
          <Activity className="w-10 h-10 text-green-400" />
        </div>

        {/* My Registrations */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex justify-between items-center border border-gray-200 hover:shadow-xl transition">
          <div>
            <h2 className="text-gray-600 text-lg">My Registrations</h2>
            <p className="text-3xl font-bold text-purple-600">
              {stats.myRegistrations || 0}
            </p>
          </div>
          <Users className="w-10 h-10 text-purple-400" />
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex justify-between items-center border border-gray-200 hover:shadow-xl transition">
          <div>
            <h2 className="text-gray-600 text-lg">Upcoming Events</h2>
            <p className="text-3xl font-bold text-orange-600">
              {stats.upcomingEvents || 0}
            </p>
          </div>
          <Calendar className="w-10 h-10 text-orange-400" />
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">🕒 Recent Activity</h2>
        {!activities || activities.length === 0 ? (
          <div className="bg-white rounded-lg shadow border border-gray-200 p-8 text-center">
            <p className="text-gray-500">No recent activities found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow border border-gray-200 p-4 hover:bg-gray-50 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {activity.title || "Activity"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {activity.description || "No description"}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {activity.time || "Recently"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;






// import React from 'react';
// import { Helmet } from 'react-helmet';

// const Dashboard = () => {
//   return (
//     <div>
//       <Helmet>
//         <title>Dashboard</title>
//       </Helmet>
//       <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
//       <p className="text-gray-600 dark:text-white">Use the sidebar to navigate through the options.</p>
//     </div>
//   );
// };

// export default Dashboard;
