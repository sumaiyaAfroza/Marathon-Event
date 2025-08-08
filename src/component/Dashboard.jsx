import React from 'react';
import { Helmet } from 'react-helmet';

const Dashboard = () => {
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p className="text-gray-600 dark:text-white">Use the sidebar to navigate through the options.</p>
    </div>
  );
};

export default Dashboard;
