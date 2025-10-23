import React, { use } from "react";
import { NavLink, Outlet } from "react-router";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { ThemeContext } from "../Context/Theme";
 
import { User } from "lucide-react"; // import at the top



const DashboardLayout = () => {
  const {theme} = use(ThemeContext)
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-blue-400 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100" data-theme={theme || 'light'}>
      <Navbar />
      <div className="p-6 text-center border-b border-blue-700">
        <h2 className="text-xl font-bold tracking-wide">🏁 Dashboard</h2>
      </div>

      {/* Dashboard Body */}
      <div className="flex flex-col md:flex-row md:mx-[100px] mx-2 gap-4 md:gap-0">
        {/* Sidebar */}
        <aside className="w-full md:w-72 text-black min-h-[120px] md:min-h-screen bg-blue-50 dark:bg-gray-800 rounded-2xl md:rounded-none mb-4 md:mb-0 shadow md:shadow-none">
          <div className="p-4 md:p-6 text-center border-b border-blue-700">
            <h2 className="text-xl md:text-2xl text-blue-700 dark:text-white font-bold tracking-wide">Marathon Events</h2>
          </div>



          <nav className="flex md:flex-col flex-row flex-wrap justify-center md:justify-start dark:text-white gap-2 md:p-4 p-2">
          

<NavLink
  to="/dashboard/profile"
  className={({ isActive }) =>
    `flex items-center gap-2 px-3 md:px-4 text-base md:text-lg py-2 rounded-md transition-all ${
      isActive
        ? "bg-blue-600 font-semibold text-white"
        : "hover:bg-blue-400 hover:text-black dark:hover:text-white"
    }`
  }
>
  <User className="w-5 h-5" />
  <span>Profile</span>
</NavLink>

           
           
           
            <NavLink
              to="/dashboard/add-marathon"
              className={({ isActive }) =>
                `px-3 md:px-4 text-base md:text-lg py-2 rounded-md transition-all ${
                  isActive
                    ? "bg-blue-600 font-semibold text-white"
                    : "hover:bg-blue-400 hover:text-black dark:hover:text-white"
                }`
              }
            >
              ➕ Add Marathon
            </NavLink>
            <NavLink
              to="/dashboard/my-marathons"
              className={({ isActive }) =>
                `px-3 md:px-4 text-base md:text-lg py-2 rounded-md transition-all ${
                  isActive
                    ? "bg-blue-600 font-semibold text-white"
                    : "hover:bg-blue-400 hover:text-black dark:hover:text-white"
                }`
              }
            >
              📋 My Marathon List
            </NavLink>
            <NavLink
              to="/dashboard/my-applies"
              className={({ isActive }) =>
                `px-3 md:px-4 text-base md:text-lg py-2 rounded-md transition-all ${
                  isActive
                    ? "bg-blue-600 font-semibold text-white"
                    : "hover:bg-blue-400 hover:text-black dark:hover:text-white"
                }`
              }
            >
              📝 My Apply List
            </NavLink>
          </nav>





        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex justify-center items-center p-2 md:p-8 rounded-tl-3xl bg-white/60 dark:bg-gray-900/60 shadow-md md:shadow-none">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;




