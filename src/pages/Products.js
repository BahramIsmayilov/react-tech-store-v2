import React from 'react';
import { ProductContext } from '../context/products';
import Loading from '../components/Loading';
import Filters from '../components/Products/Filters';
import PageProducts from '../components/Products/PageProducts';

const Products = () => {
  const { loading } = React.useContext(ProductContext);
  if (loading) return <Loading />;
  return (
    <>
      <Filters />
      <PageProducts />
    </>
  );
};

export default Products;
