import React from "react";
import axios from "axios";
import url from "../utils/URL";
import { featuredProducts, flattenProducts } from "../utils/helpers";

export const ProductContext = React.createContext();

// Provider Consumer useContext()
export default function ProductProvider({ children }) {
  const [products, setProducts] = React.useState([]);
  const [featured, setFeatured] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);

    axios.get(`${url}/products`).then(response => {
      const products = flattenProducts(response.data);
      const featured = featuredProducts(flattenProducts(response.data));
      setProducts(products);
      setFeatured(featured);
      setLoading(false);
    });

    return () => {};
  }, []);

  return (
    <ProductContext.Provider value={{ products, featured, loading }}>
      {children}
    </ProductContext.Provider>
  );
}
