import Header from "../components/Header";
import Footer from "../components/Footer";
import { allProducts } from "./Products";
import { useParams, Link } from "react-router-dom";
import { useState, Fragment, useEffect, useContext } from "react";
import ProductListing from "../components/ProductListing";
import WishlistContext from "../contexts/WishlistContext";
import CartContext from "../contexts/CartContext";

const ProductDetails = () => {
  const { isProductInWishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);
  const { isProductInCart, addToCart } = useContext(CartContext);
  const [otherDetails, setOtherDetails] = useState("additional info");
  const urlRouteParams = useParams();
  const productId = urlRouteParams["product-id"];
  const product = allProducts.find((product) => product.id == productId);
  const [currentlyViewedImage, setCurrentlyViewedImage] = useState(
    product.images[0]
  );

  useEffect(() => setCurrentlyViewedImage(product.images[0]), [product]);

  const similarProducts = allProducts.filter((currProduct) => {
    for (let i = 0; i < currProduct.category.length; i++) {
      for (let j = 0; j < product.category.length; j++) {
        if (
          currProduct.id !== product.id &&
          currProduct.category[i] == product.category[j]
        ) {
          return true;
        }
      }
    }

    for (let i = 0; i < currProduct.tags.length; i++) {
      for (let j = 0; j < product.tags.length; j++) {
        if (
          currProduct.id !== product.id &&
          currProduct.tags[i] == product.tags[j]
        ) {
          return true;
        }
      }
    }

    return false;
  });

  return (
    <>
      <Header />
      <main className="mt-5 pb-5 bg-body-tertiary">
        <div className="container">
          <section className="text-center">
            <h2 className="py-5 mb-0 display-5">{product.name}</h2>
            <div className="row w-100">
              <div className="col-md-3">
                <section className="mb-4">
                  <h5>Artist</h5>
                  <img
                    src={product.artist.profilePic}
                    alt={product.artist.name}
                    className="w-50 rounded-circle border border-light-subtle border-4"
                  />
                  <p className="mb-0 fs-5 fw-semi-bold">
                    {product.artist.name}
                  </p>
                  <button className="btn btn-link pt-1 pe-1 text-dark">
                    + Follow
                  </button>
                  <span className="text-secondary">
                    ({product.artist.noOfFollowers} fans)
                  </span>
                </section>
                <section>
                  <h5>
                    {product.name} ({product.yearOfMaking.getFullYear()})
                  </h5>
                  <p className="fw-bold text-secondary mb-1">
                    {product.rating}{" "}
                    <span className="bi-star-fill text-warning"></span>
                  </p>
                  <p className="text-secondary mb-1">
                    {product.additionalInfo.medium}
                  </p>
                  <p className="mb-5">{product.description}</p>

                  <p className="mb-1">
                    <span className="text-secondary">Dimensions:</span>{" "}
                    {product.dimensions}
                  </p>
                  <p className="mb-1">
                    <span className="text-secondary">Framing:</span>{" "}
                    {product.isFramed ? "Yes" : "No"}
                  </p>
                  <p className="mb-1">
                    <span className="text-secondary">
                      State of Preservation:
                    </span>{" "}
                    {product.stateOfPreservation}
                  </p>
                  <p className="mb-5">
                    <span className="text-secondary">Guarantee:</span>{" "}
                    {product.proofOfAuthenticity}
                  </p>

                  <p className="mb-1">Tags:</p>
                  {product.tags.map((tag) => (
                    <button
                      key={tag}
                      className="my-2 mx-1 btn btn-text text-black bg-secondary-subtle rounded-pill text-light"
                    >
                      {tag}
                    </button>
                  ))}
                </section>
              </div>
              <div className="col-md-6">
                <section className="position-relative">
                  <img
                    className="w-100 img-fluid"
                    src={currentlyViewedImage}
                    alt={product.name}
                  />
                  <a
                    style={{ cursor: "pointer" }}
                    className="position-absolute end-0 mt-2 me-3 link-danger"
                    onClick={() =>
                      isProductInWishlist(product.id)
                        ? removeFromWishlist(product.id)
                        : addToWishlist(product.id)
                    }
                  >
                    <span
                      className={`bi ${
                        isProductInWishlist(product.id)
                          ? "bi-heart-fill"
                          : "bi-heart"
                      } fs-5 fw-bold`}
                    ></span>
                  </a>
                </section>
                <section className="row mt-3">
                  {product.images.map((image, index) => (
                    <img
                      key={image}
                      className={`col-6 w-25 img-fluid ${
                        image === currentlyViewedImage
                          ? "opacity-100"
                          : "opacity-50"
                      }`}
                      src={image}
                      alt={`${product.name}'s image ${index + 1}`}
                      onClick={() => setCurrentlyViewedImage(image)}
                    />
                  ))}
                </section>
              </div>
              <div className="col-md-3">
                <section>
                  <h6>Sold & Delivered by</h6>
                  <p className="mb-3">{product.delivery.by}</p>
                  <div className="d-flex justify-content-center align-items-end">
                    <p className="fs-5 fw-bold mb-0">₹{product.sellingPrice}</p>
                    <p className="fs-6 opacity-50 ms-2 mb-0">
                      <strike>₹{product.markedPrice}</strike>
                    </p>
                  </div>
                  <p className="fs-5 fw-bold text-secondary">
                    {Math.round(
                      ((product.markedPrice - product.sellingPrice) /
                        product.markedPrice) *
                        100
                    )}
                    % off
                  </p>
                  <p className="mb-1">
                    <small>+₹{product.delivery.charge} delivery charge</small>
                  </p>
                  <p className="mb-1">
                    <small>
                      Delivery by{" "}
                      {product.delivery.estimatedDate.toLocaleDateString()}
                    </small>
                  </p>
                  <p>
                    <small>
                      {product.delivery.type} from {product.delivery.from.city}{" "}
                      - {product.delivery.from.country}
                    </small>
                  </p>
                </section>
                <section className="mt-5">
                  {!isProductInCart(productId) ? (
                    <button
                      className="btn btn-outline-primary rounded-pill px-4 me-2"
                      onClick={() => addToCart(productId)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <Link
                      className="btn btn-outline-primary rounded-pill px-4 me-2"
                      to="/cart"
                    >
                      Go To Cart
                    </Link>
                  )}
                  <button className="btn btn-primary rounded-pill px-4">
                    Buy Now
                  </button>
                </section>
              </div>
            </div>
          </section>
          <section className="mt-5 text-center">
            <div className="btn-group z-0">
              <button
                className={`btn ${
                  otherDetails === "additional info"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setOtherDetails("additional info")}
              >
                Additional Information
              </button>
              <button
                className={`btn ${
                  otherDetails === "artist bio"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setOtherDetails("artist bio")}
              >
                Artist Biography
              </button>
              <button
                className={`btn ${
                  otherDetails === "qna & comments"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setOtherDetails("qna & comments")}
              >
                Questions or Comments
              </button>
            </div>
            <div>
              {otherDetails === "additional info" ? (
                <div className="row w-50 mx-auto my-4 border border-bottom-0 rounded bg-white">
                  {Object.keys(product.additionalInfo).map((infoKey) => (
                    <Fragment key={infoKey}>
                      <div className="col-4 text-start border-end border-bottom py-2 fw-bold">
                        {infoKey}
                      </div>
                      <div className="col-8 text-start border-bottom py-2">
                        {product.additionalInfo[infoKey]}
                      </div>
                    </Fragment>
                  ))}
                </div>
              ) : otherDetails === "artist bio" ? (
                <div className="card w-50 mx-auto my-4">
                  <div className="card-body">
                    <p className="card-text">{product.artist.bio}</p>
                  </div>
                </div>
              ) : (
                product.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="card w-50 mx-auto my-4 text-start"
                  >
                    <div className="card-body">
                      <h5 className="card-title fs-6">{comment.authorId}</h5>
                      <p className="card-text">{comment.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <hr className="mt-5 mb-4" />

          <section>
            <h5 className="mb-4">More artworks you might be interested in:</h5>
            <div className="row g-3">
              {similarProducts.map((currProduct) => (
                <div key={currProduct.id} className="col-md-4">
                  <ProductListing product={currProduct} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetails;
