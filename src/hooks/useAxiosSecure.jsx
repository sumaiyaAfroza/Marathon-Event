import axios from 'axios'
import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthProvider';

const axiosInstance = axios.create({
    baseURL:`${import.meta.env.VITE_SERVER}`
})

const useAxiosSecure = () => {
     const { user } = useContext(AuthContext);
     axiosInstance.interceptors.request.use(config => {
        config.headers.authorization = `bearer ${user.accessToken}`
        return config
     })

  return axiosInstance
}

export default useAxiosSecure
