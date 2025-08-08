import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";

const UpdateMarathon = ({ item, onClose, onUpdate }) => {
  // console.log(item)
  const [formData, setFormData] = useState({
    ...item,
    startRegDate: item.startRegDate ? new Date(item.startRegDate) : null,
    endRegDate: item.endRegDate ? new Date(item.endRegDate) : null,
    marathonStartDate: item.marathonStartDate
      ? new Date(item.marathonStartDate)
      : null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updateEvent = Object.fromEntries(formData.entries());
    console.log(updateEvent);

    axios
      .put(
        `${import.meta.env.VITE_SERVER}/updateMarathonList/${item._id}`,
        updateEvent
      )
      .then((res) => {
        Swal.fire("Success", "Marathon updated successfully!", "success");
        onUpdate(item._id, updateEvent);
        onClose();
      })
      .catch((error) => console.log("error hosie", error));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-[500px] max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Update Marathon
        </h2>

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
              <label className="block mb-1 font-medium">
                Start Registration Date
              </label>
              <DatePicker
                selected={formData.startRegDate}
                name="startDate"
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, startRegDate: date }))
                }
                className="w-full border px-3 py-2 rounded"
                placeholderText="Select start date"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                End Registration Date
              </label>
              <DatePicker
                selected={formData.endRegDate}
                name="endDate"
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, endRegDate: date }))
                }
                className="w-full border px-3 py-2 rounded"
                placeholderText="Select end date"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Marathon Start Date
              </label>
              <DatePicker
                selected={formData.marathonStartDate}
                name="marathonDate"
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, marathonStartDate: date }))
                }
                className="w-full border px-3 py-2 rounded"
                placeholderText="Select marathon start date"
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

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMarathon;