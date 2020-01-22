import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import img from '../../img/a9.jpg';

const Product = ({ image, id, title, price }) => {
  return (
    <article className="product">
      <div className="img-container">
        <img src={image || img} alt={title || 'default title'} />
        <Link to={`/products/${id}`} className="btn btn-primary product-link">
          details
        </Link>
      </div>
      <div className="product-footer">
        <p className="product-title">{title || 'default title'}</p>
        <p className="product-price">${price || 0}</p>
      </div>
    </article>
  );
};
Product.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};
export default Product;
