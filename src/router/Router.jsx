import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Error from "../component/Error";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../component/Dashboard";
import Marathons from "../component/Marathons";
import DashboardLayout from "../Layout/DashboardLayout";
import AddMarathon from "../component/AddMarathon";
import MyMarathonList from "../component/MyMarathonList";
import MyApplyList from "../component/MyApplyList";
import DetailsMarathon from "../component/DetailsMarathon";
import RegisterMarathon from "../component/RegisterMarathon";
import axios from "axios";
import Sort from "../component/Sort";
import UpdateApply from "../component/UpdateApply";
import UpdateMarathon from "../component/UpdateMarathon";
import Upcoming from "../component/Upcoming";
import About from "../component/About";
import Blogs from "../component/Blogs";


export const router = createBrowserRouter([
    {
        path:'/',
        Component:MainLayout,
        children:[
            {
                index:true,
                Component: Home,
               
            },
             {
              path:'/upcoming',
              Component: Upcoming
            },
            {
                path:'/marathonSort',
                Component: Sort,
            },
            {
                path:'/login',
                Component: Login
            },
            {
                path:'/register',
                Component: Register
            },
            {
                path: '/about',
                Component: About

            },
            {
                path: '/blog',
                Component: Blogs
            },
            {
                path: '/marathons',
                Component: Marathons,
                loader: ()=> axios(`${import.meta.env.VITE_SERVER}/marathons`),
                hydrateFallbackElement:<span className="loading loading-bars loading-xl"></span> 
            },
            {
                path:'/marathon/:id',
                element: <PrivateRoute> <DetailsMarathon></DetailsMarathon> </PrivateRoute>,
            },
            {
                path:'/marathonRegister/:id',
                element: < PrivateRoute>  <RegisterMarathon></RegisterMarathon></PrivateRoute>

            },
            {
                path:'/dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            },
           
        ] 
    },
    { 
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
           
            {
                path:'/dashboard/add-marathon',
                Component: AddMarathon
            },
            {
                path:'/dashboard/my-marathons',
                Component: MyMarathonList
            },
            {
                path:'/dashboard/updateMarathon/:id',
                element: <PrivateRoute> <UpdateMarathon> </UpdateMarathon></PrivateRoute>
            },
            {
                path:'/dashboard/my-applies',
               element: <PrivateRoute><MyApplyList></MyApplyList></PrivateRoute>
            },
             {
                path:'/dashboard/updateApply/:id',
                element: <PrivateRoute> <UpdateApply></UpdateApply></PrivateRoute>
            }
            
        ]
    },
    {
        path: "*",
        element: <Error></Error>
    }  
])