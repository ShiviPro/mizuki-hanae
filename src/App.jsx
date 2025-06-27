import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import { useState } from "react";
import { allProducts } from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import UserContext from "./contexts/UserContext";
import UserProfile from "./pages/UserProfile";
import Checkout from "./pages/Checkout";
import OrderSummary from "./pages/OrderSummary";
import { users } from "./pages/Login";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(
    sessionStorage.getItem("login") ? sessionStorage.getItem("login") : ""
  );

  const currUser = users.find((user) => user.username === loggedInUser);

  const [wishlist, setWishlist] = useState(currUser?.wishlist ?? []);
  const [cart, setCart] = useState(currUser?.cart ?? []);

  const isProductInWishlist = (productId) => {
    const result = wishlist.find((product) => product.id == productId);
    return !!result;
  };

  const isProductInCart = (productId) => {
    const result = cart.find((entry) => entry.product.id == productId);
    return !!result;
  };

  const addToWishlist = (productId) => {
    if (!isProductInWishlist(productId)) {
      const productToBeAdded = allProducts.find(
        (product) => product.id == productId
      );
      setWishlist([...wishlist, productToBeAdded]);
      currUser.wishlist = [...wishlist, productToBeAdded];
    }
  };

  const incrementInCart = (productId) => {
    const result = cart.map((entry) =>
      entry.product.id == productId
        ? { ...entry, quantity: entry.quantity + 1 }
        : { ...entry }
    );

    setCart(result);
    currUser.cart = result;
  };

  const addToCart = (productId) => {
    const productToBeAdded = allProducts.find(
      (product) => product.id == productId
    );
    setCart([...cart, { product: productToBeAdded, quantity: 1 }]);
    currUser.cart = [...cart, { product: productToBeAdded, quantity: 1 }];
  };

  const removeFromWishlist = (productId) => {
    if (isProductInWishlist(productId)) {
      setWishlist(wishlist.filter((product) => product.id != productId));
      currUser.wishlist = wishlist.filter((product) => product.id != productId);
    }
  };

  const decrementInCart = (productId) => {
    const cartEntry = cart.find((entry) => entry.product.id == productId);
    const { product, quantity: currQuantity } = cartEntry;

    if (currQuantity == 1) {
      removeFromCart(productId);
    } else {
      const result = cart.map((entry) =>
        entry.product.id == productId
          ? { ...entry, quantity: entry.quantity - 1 }
          : { ...entry }
      );
      setCart(result);
      currUser.cart = result;
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((entry) => entry.product.id != productId));
    currUser.cart = cart.filter((entry) => entry.product.id != productId);
  };

  const getCartQuantity = () => {
    const totalNumberOfItems = cart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    return totalNumberOfItems;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/products",
      element: <Products />,
    },
    {
      path: "/products/:product-id",
      element: <ProductDetails />,
    },
    {
      path: "/wishlist",
      element: <Wishlist />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/user",
      element: <UserProfile />,
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
    {
      path: "/order-summary",
      element: <OrderSummary />,
    },
  ]);

  return (
    <UserContext.Provider
      value={{
        wishlist,
        isProductInWishlist,
        addToWishlist,
        removeFromWishlist,
        cart,
        isProductInCart,
        addToCart,
        removeFromCart,
        incrementInCart,
        decrementInCart,
        getCartQuantity,
        loggedInUser,
        setLoggedInUser,
      }}
    >
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
};

export default App;
