import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthProvider';
import Swal from 'sweetalert2';

const UpdateApply = ({ applyData, onUpdate, onClose }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    marathonTitle: '',
    marathonStartDate: '',
    firstName: '',
    lastName: '',
    number: '',
    email: user?.email,
  });

  useEffect(() => {
    if (applyData) {
      setFormData({
        marathonTitle: applyData.marathonTitle || '',
        marathonStartDate: applyData.marathonStartDate || '',
        firstName: applyData.firstName || '',
        lastName: applyData.lastName || '',
        number: applyData.number || '',
        email: user?.email,
      });
    }
  }, [applyData, user?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_SERVER}/updateApplyList/${applyData._id}`, formData);
      Swal.fire('Updated!', 'Application updated successfully.', 'success');
      onUpdate(); // Refresh the list
      onClose(); // Close the modal automatically
    } catch (error) {
      console.error('Update error:', error);
      Swal.fire('Error', 'Update failed. Please try again.', 'error');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Marathon Title</label>
          <input
            type="text"
            value={formData.marathonTitle}
            onChange={(e) => setFormData({ ...formData, marathonTitle: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Start Date</label>
          <input
            type="date"
            value={formData.marathonStartDate}
            onChange={(e) => setFormData({ ...formData, marathonStartDate: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">First Name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Last Name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div>
          <label className="block font-medium">Contact Number</label>
          <input
            type="text"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Update Application
        </button>
      </form>
    </div>
  );
};

export default UpdateApply;