import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import WishlistContext from "./contexts/WishlistContext";
import { useState } from "react";
import { allProducts } from "./pages/Products";
import Cart from "./pages/Cart";
import CartContext from "./contexts/CartContext";
import Login from "./pages/Login";
import UserContext from "./contexts/UserContext";
import UserProfile from "./pages/UserProfile";

const App = () => {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(
    sessionStorage.getItem("login") ? sessionStorage.getItem("login") : ""
  );

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
    }
  };

  const incrementInCart = (productId) => {
    const result = cart.map((entry) =>
      entry.product.id == productId
        ? { ...entry, quantity: entry.quantity + 1 }
        : { ...entry }
    );

    setCart(result);
  };

  const addToCart = (productId) => {
    const productToBeAdded = allProducts.find(
      (product) => product.id == productId
    );
    setCart([...cart, { product: productToBeAdded, quantity: 1 }]);
  };

  const removeFromWishlist = (productId) => {
    if (isProductInWishlist(productId)) {
      setWishlist(wishlist.filter((product) => product.id != productId));
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
    }
  };

  const removeFromCart = (productId) =>
    setCart(cart.filter((entry) => entry.product.id != productId));

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
  ]);

  return (
    <CartContext.Provider
      value={{
        cart,
        isProductInCart,
        addToCart,
        removeFromCart,
        incrementInCart,
        decrementInCart,
        getCartQuantity,
      }}
    >
      <WishlistContext.Provider
        value={{
          wishlist,
          isProductInWishlist,
          addToWishlist,
          removeFromWishlist,
        }}
      >
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
          <RouterProvider router={router} />
        </UserContext.Provider>
      </WishlistContext.Provider>
    </CartContext.Provider>
  );
};

export default App;
