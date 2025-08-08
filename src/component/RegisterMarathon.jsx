import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { format } from 'date-fns';
import Lottie from "lottie-react";
import regMarathon from '../assets/regmarathon.json';
import { AuthContext } from "../Context/AuthProvider";
import { Helmet } from "react-helmet";

const RegisterMarathon = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [item, setItem] = useState({});
  const { title,marathonStartDate } = item;

  // fetch marathon info
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/marathonRegister/${id}`)
      .then((res) => setItem(res.data))
      .catch((err) => console.error(err)); 
  }, [id]);


  // handle form submit
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    const registration = {
      email: user?.email,
      marathonId: id,
      marathonTitle: item.title,
      marathonStartDate: item.marathonStartDate,
    //   startRegDate: item.startRegDate,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      number: form.number.value,
      info: form.information.value,
      registeredAt: new Date()
    };
    console.log(registration)

    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER}/registerMarathon/${id}`, registration);
      console.log(res.data)
      if (res.data.acknowledged) {
        alert("✅ Registered Successfully & Count Updated!");
        form.reset();
      }
    } catch (error) {
      console.error(error);
      alert("❌ Registration Failed");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl mx-auto p-4">
      <Helmet>
        <title>Register</title>
      </Helmet>
      {/* Lottie animation */}
      <div className="w-full md:w-1/2">
        <Lottie className="h-[500px]" animationData={regMarathon} loop={true} />
      </div>

      {/* Form */}
      <form onSubmit={handleRegister} className="w-full bg-white dark:bg-gray-900  md:w-1/2 border p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-bold mb-4">Marathon Registration</h2>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email:</label>
          <input
            type="text"
            className="w-full p-2 border rounded text-gray-800 dark:text-gray-200"
            readOnly
            defaultValue={user?.email}
          />
        </div>

        {/* Marathon Title */}
        <div>
          <label className="block  mb-1 font-medium">Marathon Title:</label>
          <input
            type="text"
            className="w-full p-2 border rounded text-gray-800 dark:text-gray-200"
            readOnly
            defaultValue={title}
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block mb-1 font-medium">Start Date:</label>
          <input
            type="text"
            className="w-full p-2 border rounded text-gray-800 dark:text-gray-200"
            readOnly
            value={marathonStartDate ? format(new Date(marathonStartDate), 'dd MMM yyyy, hh:mm a'):''}
          />
        </div>

        {/* First & Last Name */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block mb-1 font-medium">First Name *</label>
            <input
              type="text"
              name="firstName"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-1 font-medium">Last Name *</label>
            <input
              type="text"
              name="lastName"
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        {/* Contact Number */}
        <div>
          <label className="block mb-1 font-medium">Contact Number *</label>
          <input
            type="text"
            name="number"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Additional Info */}
        <div>
          <label className="block mb-1 font-medium">Additional Info:</label>
          <textarea
            name="information"
            className="w-full p-2 border rounded"
            placeholder="Any extra message"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterMarathon;