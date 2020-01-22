import React from 'react';
import axios from 'axios';
import url from '../utils/URL';
import { featuredProducts, flattenProducts, paginate } from '../utils/helpers';

export const ProductContext = React.createContext();

// Provider Consumer useContext()
export default function ProductProvider({ children }) {
  const [products, setProducts] = React.useState([]);
  const [featured, setFeatured] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  // extra state values
  const [sorted, setSorted] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [filters, setFilters] = React.useState({
    search: '',
    category: 'all',
    shipping: false,
    price: 'all'
  });
  React.useEffect(() => {
    setLoading(true);
    axios.get(`${url}/products`).then(response => {
      const products = flattenProducts(response.data);
      const featured = featuredProducts(flattenProducts(response.data));
      setProducts(products);
      setSorted(paginate(products));
      setFeatured(featured);
      setLoading(false);
    });
    return () => {};
  }, []);

  React.useEffect(() => {
    let newProducts = [...products].sort((a, b) => a.price - b.price);
    const { search, category, shipping, price } = filters;
    if (search !== '') {
      newProducts = newProducts.filter(item => {
        let title = item.title.toLowerCase().trim();
        return title.startsWith(search) ? item : null;
      });
    }
    if (category !== 'all') {
      newProducts = newProducts.filter(item => item.category === category);
    }
    if (shipping !== false) {
      newProducts = newProducts.filter(item => item.free_shipping === true);
    }
    if (price !== 'all') {
      newProducts = newProducts.filter(item => {
        if (price === 0) {
          return item.price <= 300;
        } else if (price === 300) {
          return item.price > 300 && item.price <= 650;
        } else {
          return item.price > 650;
        }
      });
    }
    setPage(0);
    setSorted(paginate(newProducts));
  }, [filters, products]);

  const changePage = index => {
    setPage(index);
  };
  const updateFilters = e => {
    const type = e.target.type;
    const filter = e.target.name;
    const value = e.target.value;
    let filterValue;
    if (type === 'checkbox') {
      filterValue = e.target.checked;
    } else if (type === 'radio') {
      value === 'all' ? (filterValue = value) : (filterValue = parseInt(value));
    } else {
      filterValue = value;
    }
    setFilters({ ...filters, [filter]: filterValue });

    console.log(filterValue);
  };
  return (
    <ProductContext.Provider
      value={{
        products,
        featured,
        loading,
        sorted,
        page,
        filters,
        changePage,
        updateFilters
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
