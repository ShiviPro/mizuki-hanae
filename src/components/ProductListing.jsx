import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { Link } from "react-router-dom";

const ProductListing = ({ product }) => {
  const {
    isProductInWishlist,
    addToWishlist,
    removeFromWishlist,
    isProductInCart,
    addToCart,
    loggedInUser,
  } = useContext(UserContext);

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
          <div className="d-flex justify-content-center align-items-end">
            <p className="card-text fs-5 fw-bold mb-0">
              ₹{product.sellingPrice}
            </p>
            <p className="card-text fs-6 opacity-50 ms-2 mb-0">
              <strike>₹{product.markedPrice}</strike>
            </p>
          </div>
          <p>
            {Math.round(
              ((product.markedPrice - product.sellingPrice) /
                product.markedPrice) *
                100
            )}
            % off
          </p>
        </Link>
      </div>
      <div className="d-grid">
        {!isProductInCart(product.id) ? (
          loggedInUser ? (
            <button
              className="btn btn-primary rounded-0 rounded-bottom"
              onClick={() => addToCart(product.id)}
            >
              Add To Cart
            </button>
          ) : (
            <Link
              className="btn btn-primary rounded-0 rounded-bottom"
              to="/login"
            >
              Add To Cart
            </Link>
          )
        ) : (
          <Link
            to={loggedInUser ? "/cart" : "/login"}
            className="btn btn-outline-primary rounded-0 rounded-bottom"
          >
            Go To Cart
          </Link>
        )}
      </div>
      {loggedInUser ? (
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
      ) : (
        <Link
          to="/login"
          className="position-absolute end-0 mt-2 me-3 link-danger"
        >
          <span className="bi bi-heart fs-5 fw-bold"></span>
        </Link>
      )}
    </section>
  );
};

export default ProductListing;
