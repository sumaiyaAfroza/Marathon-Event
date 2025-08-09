import React from "react";
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
      
      <Sort></Sort>
      <Upcoming></Upcoming>
      <MarathonEvent></MarathonEvent>
      <Extra></Extra>
      <ExtraSection></ExtraSection>
    </div>
  );
};
export default Home;
