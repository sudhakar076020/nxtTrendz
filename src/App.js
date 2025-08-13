import { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductItemDetails from "./components/ProductItemDetails";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import CartContext from "./context/CartContext";

import "./App.css";

class App extends Component {
  state = {
    cartList: [],
  };

  removeAllCartItems = () => {
    this.setState({ cartList: [] });
  };

  addCartItem = (product) => {
    console.log(product);
    this.setState((prevState) => {
      const productExist = prevState.cartList.find(
        (eachItem) => eachItem.id === product.id
      );
      if (productExist) {
        return {
          cartList: prevState.cartList.map((item) => {
            if (item.id === product.id) {
              return { ...item, quantity: item.quantity + product.quantity };
            }
            return item;
          }),
        };
      }
      return {
        cartList: [...prevState.cartList, { ...product }],
      };
    });
  };

  removeCartItem = (id) => {
    this.setState((prevState) => ({
      cartList: prevState.cartList.filter((eachItem) => eachItem.id !== id),
    }));
  };

  incrementCartItemQuantity = (product) => {
    this.setState((prevState) => ({
      cartList: prevState.cartList.map((eachItem) => {
        if (eachItem.id === product.id) {
          return { ...eachItem, quantity: eachItem.quantity + 1 };
        }
        return eachItem;
      }),
    }));
  };

  decrementCartItemQuantity = (product) => {
    this.setState((prevState) => ({
      cartList: prevState.cartList
        .map((eachItem) => {
          if (eachItem.id === product.id) {
            return { ...eachItem, quantity: eachItem.quantity - 1 };
          }
          return eachItem;
        })
        .filter((eachItem) => eachItem.quantity > 0),
    }));
  };

  render() {
    const { cartList } = this.state;

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Routes>
          <Route exact path="/login" element={<LoginForm />} />
          {/* ProtectedRoute components */}
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/products/:id"
            element={
              <ProtectedRoute>
                <ProductItemDetails />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </CartContext.Provider>
    );
  }
}

export default App;
