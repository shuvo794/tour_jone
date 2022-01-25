import React from 'react';
import { useParams } from 'react-router';
import Footer from '../../Shared/Footer/Footer';
import Navigation from '../../Shared/Navigation/Navigation';
import ProductDetail from '../productDetail/ProductDetail';

const ProductDetailPage = () => {
  const { id } = useParams();
  return (
    <>
      <Navigation></Navigation>
      <ProductDetail id={id}></ProductDetail>
      <Footer></Footer>
    </>
  );
};

export default ProductDetailPage;