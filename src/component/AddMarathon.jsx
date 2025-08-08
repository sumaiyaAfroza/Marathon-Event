import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Swal from "sweetalert2"; // ✅ SweetAlert2 import
import { AuthContext } from "../Context/AuthProvider";
import { Helmet } from "react-helmet";

const AddMarathon = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    distance: "",
    description: "",
    image: "",
    startRegDate: null,
    endRegDate: null,
    marathonStartDate: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const marathon = {
      ...formData,
      createdAt: new Date(),
      totalRegistration: 0,
      email: user.email,
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER}/marathons`, marathon);
      if (res.data.insertedId) {
        // ✅ Success alert
        Swal.fire({
          icon: "success",
          title: "Marathon Added!",
          text: "✅ Your marathon has been successfully added.",
          confirmButtonColor: "#3085d6",
        });

        // Clear form
        setFormData({
          title: "",
          location: "",
          distance: "",
          description: "",
          image: "",
          startRegDate: null,
          endRegDate: null,
          marathonStartDate: null,
        });
      }
    } catch (err) {
      console.error(err);
      // ❌ Error alert
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "❌ Failed to add marathon. Please try again later.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="max-w-3xl bg-blue-200 dark:bg-gray-800 dark:text-white shadow-blue-100 p-6 rounded-lg">
      <Helmet>
        <title>Add Marathon</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-6">Add New Marathon</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Marathon Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter marathon title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">Start Registration Date</label>
            <DatePicker
              selected={formData.startRegDate}
              onChange={(date) =>
                setFormData((prev) => ({ ...prev, startRegDate: date }))
              }
              className="w-full border px-3 py-2 rounded"
              placeholderText="Select start date"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">End Registration Date</label>
            <DatePicker
              selected={formData.endRegDate}
              onChange={(date) =>
                setFormData((prev) => ({ ...prev, endRegDate: date }))
              }
              className="w-full border px-3 py-2 rounded"
              placeholderText="Select end date"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Marathon Start Date</label>
            <DatePicker
              selected={formData.marathonStartDate}
              onChange={(date) =>
                setFormData((prev) => ({ ...prev, marathonStartDate: date }))
              }
              className="w-full border px-3 py-2 rounded"
              placeholderText="Select marathon date"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Running Distance</label>
          <select
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          >
            <option value="">Select distance</option>
            <option value="3k">3k</option>
            <option value="10k">10k</option>
            <option value="25k">25k</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            placeholder="Write marathon description..."
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            placeholder="Enter image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddMarathon;