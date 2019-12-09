import React from "react";
// react-router-dom
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// pages
import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
//components
import Header from "./components/Header";
import Alert from "./components/Alert";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Header />
      <Alert />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <PrivateRoute path="/checkout" name="John" msg="hello">
          <Checkout />
        </PrivateRoute>
        <Route exact path="/products/:id" children={<ProductDetails />} />
        <Route>
          <Error path="*" />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
