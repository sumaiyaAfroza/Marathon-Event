import React, { useState } from "react";
import MarathonEvent from "../component/MarathonEvent";
import Banner from "../component/Banner";
import Sort from "../component/Sort";
import Upcoming from "../component/Upcoming";
import Extra from "../component/Extra";
import ExtraSection from "../component/Extrasection";
import { Helmet } from "react-helmet";

const Home = () => {

  return (
    <div>
      <Helmet>
      <title>Home</title>
      </Helmet>
      <Banner></Banner>
      <div className="text-center space-y-4 mt-24">
        <h1 className="font-bold text-blue-700 text-3xl "> Global Marathon Spectacular 2025</h1>
        <p className="text-lg mb-10">
          Join us for an unforgettable journey across stunning landscapes, from
          city skylines to coastal shores, <br /> in this worldwide celebration of
          running and community spirit.
        </p>
      </div>
      <Sort></Sort>
      <Upcoming></Upcoming>
      <MarathonEvent></MarathonEvent>
      <Extra></Extra>
      <ExtraSection></ExtraSection>
    </div>
  );
};
export default Home;
