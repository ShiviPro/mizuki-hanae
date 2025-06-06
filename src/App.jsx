import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import WishlistContext from "./contexts/WishlistContext";
import { useState } from "react";
import { allProducts } from "./pages/Products";

const App = () => {
  const [wishlist, setWishlist] = useState([]);

  const isProductInWishlist = (productId) => {
    const result = wishlist.find((product) => product.id == productId);
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

  const removeFromWishlist = (productId) => {
    if (isProductInWishlist(productId)) {
      setWishlist(wishlist.filter((product) => product.id != productId));
    }
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
  ]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isProductInWishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      <RouterProvider router={router} />
    </WishlistContext.Provider>
  );
};

export default App;
