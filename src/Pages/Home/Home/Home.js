import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Navigation from '../../Shared/Navigation/Navigation';
import Contact from '../Contact/Contact';
import HomeBanner from '../HomeBanner/HomeBanner';
import Products from '../Products/Products';
import Review from '../Review/Review';
const containerStyle = {
  backgroundColor: "#ecf0f1",
  // backgroundImage: `url("https://i.ibb.co/f4Ryhq6/homeBg.png")`,
  backgroundSize: "32% auto",
  backgroundRepeat: "no-repeat",
};
const Home = () => {
  return (
    <>
      <div style={containerStyle}>
        <Navigation></Navigation>
        <HomeBanner></HomeBanner>
      </div>
      <Products></Products>
      <Review></Review>
      <Contact></Contact>
      <Footer></Footer>
    </>
  );
};

export default Home;