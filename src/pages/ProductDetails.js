import React from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/products";
import { CartContext } from "../context/cart";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading";

const ProductDetails = () => {
  const { products } = React.useContext(ProductContext);
  const { addToCart } = React.useContext(CartContext);
  const { id } = useParams();
  const history = useHistory();
  const product = products.find(item => item.id === parseInt(id));
  console.log(history);

  if (products.length === 0) {
    return <Loading />;
  } else {
    const { image, title, description, price } = product;

    return (
      <section className="single-product">
        <img src={image} alt={title} className="single-product-image" />
        <article>
          <h1>{title}</h1>
          <h2>${price}</h2>
          <p>{description}</p>
          <button
            className="btn btn-promary btn-block"
            onClick={() => {
              //add to cart
              history.push("/cart");
              addToCart(product);
            }}
          >
            add to cart
          </button>
        </article>
      </section>
    );
  }
};

export default ProductDetails;
