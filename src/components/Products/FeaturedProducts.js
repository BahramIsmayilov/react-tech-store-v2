import React from "react";
import ProductList from "../Products/ProductList";
import Loading from "../Loading";
import { ProductContext } from "../../context/products";

const FeaturedProducts = () => {
  const { loading, featured } = React.useContext(ProductContext);
  if (loading) return <Loading />;
  return <ProductList title="featured products" products={featured} />;
};

export default FeaturedProducts;
