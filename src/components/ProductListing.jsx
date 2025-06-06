import { useContext } from "react";
import WishlistContext from "../contexts/WishlistContext";
import { Link } from "react-router-dom";
import CartContext from "../contexts/CartContext";

const ProductListing = ({ product }) => {
  const { isProductInWishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);
  const { isProductInCart, addToCart } = useContext(CartContext);

  return (
    <section className="card border-0 bg-white position-relative">
      <img
        src={product.images[0]}
        alt={product.name}
        className="card-img-top"
      />
      <div className="card-body text-center">
        <Link
          to={`/products/${product.id}`}
          className="link-dark link-underline link-underline-opacity-0 link-underline-opacity-50-hover"
        >
          <h6 className="card-title">{product.name}</h6>
        </Link>
        <p className="card-text text-primary fw-bold mb-1">
          {product.rating}{" "}
          <small>
            <i className="bi bi-star-fill"></i>
          </small>
        </p>
        <Link
          to={`/products/${product.id}`}
          className="link-dark link-underline link-underline-opacity-0 link-underline-opacity-50-hover"
        >
          <p className="card-text fs-5 fw-bold">₹{product.price}</p>
        </Link>
      </div>
      <div className="d-grid">
        {!isProductInCart(product.id) ? (
          <button
            className="btn btn-primary rounded-0 rounded-bottom"
            onClick={() => addToCart(product.id)}
          >
            Add To Cart
          </button>
        ) : (
          <Link
            to="/cart"
            className="btn btn-outline-primary rounded-0 rounded-bottom"
          >
            Go To Cart
          </Link>
        )}
      </div>
      <a
        style={{ cursor: "pointer" }}
        className="position-absolute end-0 mt-2 me-3 link-danger"
      >
        <span
          className={`bi ${
            isProductInWishlist(product.id) ? "bi-heart-fill" : "bi-heart"
          } fs-5 fw-bold`}
          onClick={() => {
            isProductInWishlist(product.id)
              ? removeFromWishlist(product.id)
              : addToWishlist(product.id);
          }}
        ></span>
      </a>
    </section>
  );
};

export default ProductListing;
