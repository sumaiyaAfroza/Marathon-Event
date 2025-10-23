import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Users, MapPin, Clock, Award, Activity } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMarathons: 0,
    myMarathons: 0,
    myRegistrations: 0,
    upcomingEvents: 0
  });
  
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Replace with your actual API endpoint
      const token = localStorage.getItem('token');
      
      // Fetch statistics
      const statsRes = await fetch('http://localhost:5000/api/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const statsData = await statsRes.json();
      setStats(statsData);

      // Fetch recent activity
      const activityRes = await fetch('http://localhost:5000/api/dashboard/recent-activity', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const activityData = await activityRes.json();
      setRecentActivity(activityData);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to your Dashboard</h1>
        <p className="text-blue-100">Use the sidebar to navigate through the options.</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Calendar className="w-8 h-8" />}
          title="Total Marathons"
          value={stats.totalMarathons}
          color="bg-blue-500"
          trend="+12%"
        />
        <StatCard
          icon={<Award className="w-8 h-8" />}
          title="My Marathons"
          value={stats.myMarathons}
          color="bg-green-500"
          trend="+5%"
        />
        <StatCard
          icon={<Users className="w-8 h-8" />}
          title="My Registrations"
          value={stats.myRegistrations}
          color="bg-purple-500"
          trend="+8%"
        />
        <StatCard
          icon={<TrendingUp className="w-8 h-8" />}
          title="Upcoming Events"
          value={stats.upcomingEvents}
          color="bg-orange-500"
          trend="+3%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <ActivityItem key={index} activity={activity} />
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No recent activity</p>
            )}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <QuickActionButton
              icon={<Calendar className="w-5 h-5" />}
              text="Create Marathon"
              color="bg-blue-500 hover:bg-blue-600"
              onClick={() => window.location.href = '/dashboard/add-marathon'}
            />
            <QuickActionButton
              icon={<MapPin className="w-5 h-5" />}
              text="Browse Marathons"
              color="bg-green-500 hover:bg-green-600"
              onClick={() => window.location.href = '/marathons'}
            />
            <QuickActionButton
              icon={<Users className="w-5 h-5" />}
              text="My Registrations"
              color="bg-purple-500 hover:bg-purple-600"
              onClick={() => window.location.href = '/dashboard/my-apply-list'}
            />
            <QuickActionButton
              icon={<Award className="w-5 h-5" />}
              text="My Marathons"
              color="bg-orange-500 hover:bg-orange-600"
              onClick={() => window.location.href = '/dashboard/my-marathon-list'}
            />
          </div>

          {/* Upcoming Marathon Preview */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Next Marathon
            </h3>
            <p className="text-sm text-gray-600">Dhaka City Marathon</p>
            <p className="text-xs text-gray-500 mt-1">Starting in 15 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, title, value, color, trend }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
        <p className="text-green-500 text-sm mt-1 font-semibold">{trend} from last month</p>
      </div>
      <div className={`${color} text-white p-3 rounded-full`}>
        {icon}
      </div>
    </div>
  </div>
);

// Activity Item Component
const ActivityItem = ({ activity }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'registration':
        return <Users className="w-5 h-5 text-green-500" />;
      case 'creation':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'update':
        return <TrendingUp className="w-5 h-5 text-orange-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="mt-1">{getActivityIcon(activity.type)}</div>
      <div className="flex-1">
        <p className="text-gray-800 font-medium">{activity.title}</p>
        <p className="text-sm text-gray-500">{activity.description}</p>
        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
      </div>
    </div>
  );
};

// Quick Action Button Component
const QuickActionButton = ({ icon, text, color, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full ${color} text-white py-3 px-4 rounded-lg flex items-center gap-3 transition-all transform hover:scale-105 shadow-md`}
  >
    {icon}
    <span className="font-medium">{text}</span>
  </button>
);

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
