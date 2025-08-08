import React, { useState, use } from "react";
import { NavLink, Outlet } from "react-router";
import { FaBars } from "react-icons/fa";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { ThemeContext } from "../Context/Theme";

const DashboardLayout = () => {
  const { theme } = use(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-blue-400 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100"
      data-theme={theme || "light"}
    >
      <Navbar />
      <div className="p-4 text-center border-b border-blue-700">
        <h2 className="text-xl font-bold tracking-wide">🏁 Dashboard</h2>
      </div>

      {/* Dashboard Body */}
      <div className="flex flex-col lg:flex-row px-4 md:px-10">
        {/* Sidebar or Dropdown */}
        <aside className="w-full lg:w-72 text-black dark:text-white">
          {/* Small Device Dropdown Toggle */}
          <div className="lg:hidden flex justify-between items-center border-b border-blue-700 p-4">
            <h2 className="text-2xl text-blue-700 dark:text-white font-bold">
              Marathon Menu
            </h2>
            <button
              onClick={toggleMenu}
              className="text-2xl text-blue-700 dark:text-white focus:outline-none"
            >
              <FaBars />
            </button>
          </div>

          {/* Dropdown Menu for Small Devices */}
          {menuOpen && (
            <nav className="lg:hidden flex flex-col gap-2 p-4 bg-blue-100 dark:bg-gray-800 rounded-md shadow">
              <NavLink
                to="/dashboard/add-marathon"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 text-lg py-2 rounded-md transition-all ${
                    isActive
                      ? "bg-blue-600 font-semibold"
                      : "hover:bg-blue-400 hover:text-black"
                  }`
                }
              >
                ➕ Add Marathon
              </NavLink>

              <NavLink
                to="/dashboard/my-marathons"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 text-lg py-2 rounded-md transition-all ${
                    isActive
                      ? "bg-blue-600 font-semibold"
                      : "hover:bg-blue-400 hover:text-black"
                  }`
                }
              >
                📋 My Marathon List
              </NavLink>

              <NavLink
                to="/dashboard/my-applies"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 text-lg py-2 rounded-md transition-all ${
                    isActive
                      ? "bg-blue-600 font-semibold"
                      : "hover:bg-blue-400 hover:text-black"
                  }`
                }
              >
                📝 My Apply List
              </NavLink>
            </nav>
          )}

          {/* Sidebar for Large Devices */}
          <div className="hidden lg:block border-r border-blue-700">
            <div className="p-6 text-center">
              <h2 className="text-2xl text-blue-700 dark:text-white font-bold tracking-wide">
                Marathon Events
              </h2>
            </div>
            <nav className="flex flex-col gap-2 p-4">
              <NavLink
                to="/dashboard/add-marathon"
                className={({ isActive }) =>
                  `px-4 text-lg py-2 rounded-md transition-all ${
                    isActive
                      ? "bg-blue-600 font-semibold"
                      : "hover:bg-blue-400 hover:text-black"
                  }`
                }
              >
                ➕ Add Marathon
              </NavLink>

              <NavLink
                to="/dashboard/my-marathons"
                className={({ isActive }) =>
                  `px-4 text-lg py-2 rounded-md transition-all ${
                    isActive
                      ? "bg-blue-600 font-semibold"
                      : "hover:bg-blue-400 hover:text-black"
                  }`
                }
              >
                📋 My Marathon List
              </NavLink>

              <NavLink
                to="/dashboard/my-applies"
                className={({ isActive }) =>
                  `px-4 text-lg py-2 rounded-md transition-all ${
                    isActive
                      ? "bg-blue-600 font-semibold"
                      : "hover:bg-blue-400 hover:text-black"
                  }`
                }
              >
                📝 My Apply List
              </NavLink>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 flex justify-center items-start">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;





// import React, { use } from "react";
// import { NavLink, Outlet } from "react-router";
// import Navbar from "../component/Navbar";
// import Footer from "../component/Footer";
// import { ThemeContext } from "../Context/Theme";



// const DashboardLayout = () => {
//   const {theme} = use(ThemeContext)
//   return (
    
//         <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-blue-400 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100" data-theme={theme || 'light'}>
//       <Navbar />
//       <div className="p-6 text-center border-b border-blue-700">
//             <h2 className="text-xl font-bold tracking-wide">🏁 Dashboard</h2>
//           </div>

//       {/* Dashboard Body */}
//       <div className="flex  mx-[100px]">
//         {/* Sidebar */}
//         <aside className="w-72 h-[100px]  text-black min-h-screen ">
//            <div className="p-6 text-center border-b border-blue-700">
//             <h2 className="text-2xl text-blue-700 dark:text-white font-bold tracking-wide">Marathon Events</h2>
//           </div>

//           <nav className="flex flex-col dark:text-white gap-2 p-4">
//             <NavLink
//               to="/dashboard/add-marathon"
//               className={({ isActive }) =>
//                 `px-4 text-lg py-2 rounded-md transition-all ${
//                   isActive
//                     ? " bg-blue-600 font-semibold"
//                     : "hover:bg-blue-400 hover:text-black "
//                 }`
//               }
//             >
//               ➕ Add Marathon
//             </NavLink>

//             <NavLink
//               to="/dashboard/my-marathons"
//               className={({ isActive }) =>
//                 `px-4  text-lg py-2 rounded-md  transition-all ${
//                   isActive
//                     ? "bg-blue-600 font-semibold"
//                     : "hover:bg-blue-400 hover:text-white"
//                 }`
//               }
//             >
//               📋 My Marathon List
//             </NavLink>

//             <NavLink
//               to="/dashboard/my-applies"
//               className={({ isActive }) =>
//                 `px-4 py-2 rounded-md  text-lg transition-all ${
//                   isActive
//                     ? "bg-blue-600 font-semibold"
//                     : "hover:bg-blue-400 hover:text-white"
//                 }`
//               }
//             >
//               📝 My Apply List
//             </NavLink>
//           </nav>
//         </aside>

//         {/* Main Content Area */}
//         <main className="flex-1 justify-center items-center p-8 flex rounded-tl-3xl ">
//           {/* <div className="text-2xl font-bold mb-4 text-gray-800">
//             Dashboard Panel
//           </div> */}
//           <Outlet />
//         </main>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default DashboardLayout;