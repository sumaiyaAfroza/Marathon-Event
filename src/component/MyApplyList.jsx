
import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import axios from 'axios';
import { FaCalendarAlt, FaUser, FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import UpdateApply from './UpdateApply';
import { Helmet } from 'react-helmet';

Modal.setAppElement('#root');

const MyApplyList = () => {
  const { user } = useContext(AuthContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [search, setSearch] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/marathonRegister?email=${user.email}`,
          { params: { search: searchQuery } }
        );
        setSearch(res?.data);
      } catch (error) {
        console.error('Error fetching marathon list:', error);
      }
    };

    if (user?.email) {
      fetchList();
    }
  }, [user?.email, searchQuery]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${import.meta.env.VITE_SERVER}/deleteRegister/${id}`);
          setSearch(prev => prev.filter(item => item._id !== id));
          Swal.fire('Deleted!', 'Your registration has been deleted.', 'success');
        } catch (error) {
          console.log('Delete error:', error);
          Swal.fire('Failed!', 'Something went wrong. Try again later.', 'error');
        }
      }
    });
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalIsOpen(false);
  };

  const refreshList = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER}/marathonRegister?email=${user.email}`);
      setSearch(res?.data);
    } catch (error) {
      console.error('Error refreshing list:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-4 sm:p-6 bg-blue-100 dark:bg-gray-800">
      <Helmet>
        <title>My Apply List</title>
      </Helmet>

      <h1 className="text-xl sm:text-2xl text-center font-bold mb-6">My Applied Marathons</h1>

      <div className="text-center mb-6">
        <input
          type="text"
          placeholder="🔎 Search by title or location..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full max-w-xs border text-sm sm:text-base text-center border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full text-xs sm:text-sm dark:bg-gray-700 dark:text-white bg-white text-black">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white uppercase text-left">
              <th className="px-2 sm:px-6 py-3">Marathon</th>
              <th className="px-2 sm:px-6 py-3">Date</th>
              <th className="px-2 sm:px-6 py-3">Participant</th>
              <th className="px-2 sm:px-6 py-3">Contact</th>
              <th className="px-2 sm:px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {search.length > 0 ? (
              search.map((item, index) => (
                <tr key={index} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-2 sm:px-6 py-3">🏃‍♂️ {item.marathonTitle}</td>
                  <td className="px-2 sm:px-6 py-3">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <FaCalendarAlt className="text-yellow-500" />
                      {item.marathonStartDate}
                    </div>
                  </td>
                  <td className="px-2 sm:px-6 py-3">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <FaUser className="text-orange-500" />
                      {item.firstName} {item.lastName}
                    </div>
                  </td>
                  <td className="px-2 sm:px-6 py-3">{item.number}</td>
                  <td className="px-2 sm:px-6 py-3">
                    <div className="flex flex-wrap gap-2 sm:gap-4">
                      <button
                        onClick={() => openModal(item)}
                        className="text-blue-500 hover:underline flex items-center gap-1"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 hover:underline flex items-center gap-1"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '500px',
          },
        }}
        contentLabel="Update Application Modal"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Update Your Application</h2>
        {selectedItem && (
          <UpdateApply
            applyData={selectedItem}
            onUpdate={refreshList}
            onClose={closeModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default MyApplyList;