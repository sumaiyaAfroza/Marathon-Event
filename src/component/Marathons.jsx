
import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router';
import SingleMarathon from './SingleMarathon';
import { Helmet } from 'react-helmet';
import Loading from './Loading';


const Marathons = () => {
  const marathonData = useLoaderData();
  const [sortType, setSortType] = useState('default');
  const [sortedData, setSortedData] = useState(marathonData.data);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(!marathonData.data || marathonData.data.length === 0);
    let sorted = [...marathonData.data];
    if (sortType === 'oldest') {
      sorted.sort((a, b) => new Date(a.startRegDate) - new Date(b.startRegDate));
    } else if (sortType === 'latest') {
      sorted.sort((a, b) => new Date(b.startRegDate) - new Date(a.startRegDate));
    }
    setSortedData(sortType === 'default' ? marathonData.data : sorted);
  }, [sortType, marathonData.data]);

  useEffect(() => {
    if (marathonData.data && marathonData.data.length > 0) {
      setLoading(false);
    }
  }, [marathonData.data]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className='text-3xl font-bold text-center m-10'>Marathons</h1>
      <Helmet>
        <title>Marathon</title>
      </Helmet>

      {/* Sort Dropdown */}
      <div className="flex justify-end items-center px-6 mb-4">
        <label htmlFor="sort" className="mr-2 font-medium">Sort by:</label>
        <select
          id="sort"
          value={sortType}
          onChange={e => setSortType(e.target.value)}
          className="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="default">Default</option>
          <option value="oldest">Registration Date: Oldest</option>
          <option value="latest">Registration Date: Latest</option>
        </select>
      </div>

      <div className='grid grid-cols-1 px-6 lg:grid-cols-3 gap-4'>
        {sortedData.map(data => (
          <SingleMarathon key={data._id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default Marathons;