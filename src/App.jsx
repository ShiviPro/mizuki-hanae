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

const App = () => {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

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
    const cartEntry = cart.find((entry) => entry.product.id == productId);
    const { product, quantity: currQuantity } = cartEntry;
    setCart([
      ...cart.filter((entry) => entry.product.id != productId),
      { product, quantity: currQuantity + 1 },
    ]);
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
      setCart([
        ...cart.filter((entry) => entry.product.id != productId),
        { product, quantity: currQuantity - 1 },
      ]);
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
        <RouterProvider router={router} />
      </WishlistContext.Provider>
    </CartContext.Provider>
  );
};

export default App;
