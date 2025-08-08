import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import UpdateMarathon from './UpdateMarathon';
import DeleteConfirmModal from './DeleteConfirmModal';
import { Helmet } from 'react-helmet';

const MyMarathonList = () => {
  const { user } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItemId, setDeletingItemId] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/marathons`);
        const filtered = res.data?.filter(item => item.email === user?.email);
        setList(filtered || []);
      } catch (error) {
        console.error('Error fetching marathon list:', error);
      }
    };
    if (user?.email) {
      fetchList();
    }
  }, [user?.email]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER}/deleteMarathon/${deletingItemId}`);
      setList(prev => prev.filter(item => item._id !== deletingItemId));
      setDeletingItemId(null); // Close modal
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleUpdate = (id, updatedItem) => {
    setList(prev => prev.map(item => item._id === id ? { ...item, ...updatedItem } : item));
  };

  return (
    <div className="p-4 sm:p-6 bg-blue-100 dark:bg-gray-700">
      <Helmet>
        <title>My Marathon List</title>
      </Helmet>

      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
        Your Created Marathons
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full text-sm sm:text-base text-left bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase">
            <tr>
              <th className="px-2 sm:px-4 py-2 sm:py-3 border">#</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 border">Marathon Title</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 border">Date</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 border">Distance</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 border">Location</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 border">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-800 dark:text-white">
            {list.length > 0 ? (
              list.map((data, idx) => (
                <tr
                  key={idx}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="text-center border px-2 sm:px-3 py-2">{idx + 1}</td>
                  <td className="border py-2 px-2 sm:px-4">{data.title}</td>
                  <td className="border py-2 px-2 sm:px-4">{data.marathonStartDate}</td>
                  <td className="border py-2 px-2 sm:px-4">{data.distance}</td>
                  <td className="border py-2 px-2 sm:px-4">{data.location}</td>
                  <td className="border py-2 px-2 sm:px-4 text-center">
                    <div className="flex flex-wrap justify-center items-center gap-2">
                      <button
                        onClick={() => setEditingItem(data)}
                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 sm:px-3 rounded text-xs sm:text-sm"
                      >
                        <FaEdit /> update
                      </button>
                      <button
                        onClick={() => setDeletingItemId(data._id)}
                        className="flex items-center gap-1 bg-blue-400 hover:bg-blue-500 text-black px-2 py-1 sm:px-3 rounded text-xs sm:text-sm"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center px-4 py-6 text-gray-400 text-sm sm:text-base"
                >
                  No marathons found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {editingItem && (
        <UpdateMarathon
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onUpdate={handleUpdate}
        />
      )}

      {/* Delete Modal */}
      {deletingItemId && (
        <DeleteConfirmModal
          onConfirm={handleDelete}
          onCancel={() => setDeletingItemId(null)}
        />
      )}
    </div>
  );
};

export default MyMarathonList;




// import React, { useEffect, useState, useContext } from 'react';
// import { AuthContext } from '../Context/AuthProvider';
// import axios from 'axios';
// import { FaEdit, FaTrash } from 'react-icons/fa';
// import UpdateMarathon from './UpdateMarathon';
// import DeleteConfirmModal from './DeleteConfirmModal';
// import { Helmet } from 'react-helmet';


// const MyMarathonList = () => {
//   const { user } = useContext(AuthContext);
//   const [list, setList] = useState([]);
//   const [editingItem, setEditingItem] = useState(null);
//   const [deletingItemId, setDeletingItemId] = useState(null); 


//   useEffect(() => {
//     const fetchList = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_SERVER}/marathons`);
//         const filtered = res.data?.filter(item => item.email === user?.email);
//         setList(filtered || []);
//       } catch (error) {
//         console.error('Error fetching marathon list:', error);
//       }
//     };
//     if (user?.email) {
//       fetchList();
//     }
//   }, [user?.email]);


//   const handleDelete = async () => {
//     try {
//       await axios.delete(`${import.meta.env.VITE_SERVER}/deleteMarathon/${deletingItemId}`);
//       setList(prev => prev.filter(item => item._id !== deletingItemId));
//       setDeletingItemId(null); // Close modal
//     } catch (error) {
//       console.error('Delete error:', error);
//     }
//   };

//   const handleUpdate = (id, updatedItem) => {
//     setList(prev => prev.map(item => item._id === id ? { ...item, ...updatedItem } : item));
//   };

  
//   return (
//     <div className="p-6 bg-blue-100 dark:bg-gray-700">
//       <Helmet>
//         <title>My Marathon List</title>
//       </Helmet>
//       <h1 className="text-2xl font-bold mb-6">Your Created Marathons</h1>

//       <div className="overflow-x-auto rounded-lg p-2 shadow-lg">
//         <table className="min-w-full text-left bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
//           <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase text-sm">
//             <tr>
//               <th className="px-4 py-3 border">#</th>
//               <th className="px-4 py-3 border">Marathon Title</th>
//               <th className="px-4 py-3 border">Date</th>
//               <th className="px-4 py-3 border">Distance</th>
//               <th className="px-4 py-3 border">Location</th>
//               <th className="px-4 py-3 border">Actions</th>
//             </tr>
//           </thead>

//           <tbody className="text-gray-800 dark:text-white">
//             {list.length > 0 ? (
//               list.map((data, idx) => (
//                 <tr key={idx} className="border-t hover:bg-gray-50 dark:hover:bg-gray-800  transition">
//                   <td className="text-center border px-3">{idx + 1}</td>
//                   <td className="border py-2 px-2">{data.title}</td>
//                   <td className="border py-2 px-2">{data.marathonStartDate}</td>
//                   <td className="border py-2 px-2">{data.distance}</td>
//                   <td className="border py-2 px-2">{data.location}</td>
//                   <td className="border py-2 px-2 text-center">
//                     <div className="flex  items-center gap-2">
//                       <button
//                         onClick={() => setEditingItem(data)}
//                         className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
//                       >
//                         <FaEdit /> update
//                       </button>
//                       <button
//                         onClick={() => setDeletingItemId(data._id)} // 🆕
//                         className="flex items-center gap-1 bg-blue-400 hover:bg--700 text-black px-3 py-1 rounded text-sm"
//                       >
//                         <FaTrash /> Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center px-6 py-6 text-gray-400">No marathons found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Update Modal */}
//       {editingItem && (
//         <UpdateMarathon
//           item={editingItem}
//           onClose={() => setEditingItem(null)}
//           onUpdate={handleUpdate}
//         />
//       )}

//       {/*Delete Modal */}
//       {deletingItemId && (
//         <DeleteConfirmModal
//           onConfirm={handleDelete}
//           onCancel={() => setDeletingItemId(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default MyMarathonList;