import React from 'react'
import { useLoaderData } from 'react-router'
import SingleMarathon from './SingleMarathon'
import { Helmet } from 'react-helmet'
import Loading from './Loading'

const Marathons = () => {
  
  const marathonData = useLoaderData()
  console.log(marathonData)
     
  return (
    <div>
      <h1 className='text-3xl font-bold text-center m-10'> Marathons </h1>
      <Helmet>
        <title>Marathon</title>
      </Helmet>
    <div className='grid grid-cols-1 px-6 lg:grid-cols-3 gap-4'> 
      {
        marathonData.data.map(data=> 
        
           <SingleMarathon key={data._id} data={data}></SingleMarathon>  
        )
      }
    </div>
    </div>
  )
}
export default Marathons