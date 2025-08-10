
import React, { useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import axios from 'axios';
import SingleMarathon from './SingleMarathon';
import Loading from './Loading';

const Sort = () => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSortItem = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/marathons?sort=-createdAt&limit=8`);
        setItem(response?.data.slice(0, 8));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSortItem();
  }, []);

  return (
    <>
      <div className="text-center space-y-4 mt-20">
        <h1 className="font-bold text-blue-700 text-3xl "> Global Marathon Spectacular 2025</h1>
        <p className="text-lg mb-10">
          Join us for an unforgettable journey across stunning landscapes, from
          city skylines to coastal shores, <br /> in this worldwide celebration of
          running and community spirit.
        </p>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className='grid grid-cols-1 px-6 lg:grid-cols-4 gap-4'>
          {item.map(data => <SingleMarathon key={data._id} data={data} />)}
        </div>
      )}
    </>
  );
};

export default Sort;