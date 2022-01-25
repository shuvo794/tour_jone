import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Navigation from '../../Shared/Navigation/Navigation';
import AllProducts from '../AllProducts/AllProducts';
const Explore = () => {
  const navbar = {
    background: "#EDF9FF",
  };
  return (
    <>
      <div style={navbar}>
        {" "}
        <Navigation></Navigation>
      </div>
      <AllProducts></AllProducts>
      <Footer></Footer>
    </>
  );
};

export default Explore;