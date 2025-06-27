import Header from "../components/Header";
import Footer from "../components/Footer";
import { allProducts } from "./Products";
import { useParams, Link } from "react-router-dom";
import { useState, Fragment, useEffect, useContext } from "react";
import ProductListing from "../components/ProductListing";
import UserContext from "../contexts/UserContext";

const ProductDetails = () => {
  const {
    isProductInWishlist,
    addToWishlist,
    removeFromWishlist,
    isProductInCart,
    addToCart,
    loggedInUser,
  } = useContext(UserContext);
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
        <div className="container py-5">
          <div className="row w-100 gx-5">
            <div className="col-md-5">
              <div className="row">
                <section className="col-3">
                  {product.images.map((image, index) => (
                    <img
                      key={image}
                      className={`col-12 mb-3 img-fluid ${
                        image === currentlyViewedImage
                          ? "opacity-100"
                          : "opacity-50"
                      }`}
                      src={image}
                      alt={`${product.name}'s image ${index + 1}`}
                      onClick={() => setCurrentlyViewedImage(image)}
                      style={{ cursor: "pointer" }}
                    />
                  ))}
                </section>

                <div className="col-9">
                  <section className="position-relative">
                    <img
                      className="w-100 img-fluid"
                      src={currentlyViewedImage}
                      alt={product.name}
                    />
                    {loggedInUser ? (
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
                    ) : (
                      <Link
                        to="/login"
                        className="position-absolute end-0 mt-2 me-3 link-danger"
                      >
                        <span className="bi bi-heart fs-5 fw-bold"></span>
                      </Link>
                    )}
                  </section>

                  <section className="d-grid mt-3">
                    <button className="btn btn-primary px-4 rounded-0 mb-3">
                      Buy Now
                    </button>

                    {!isProductInCart(productId) ? (
                      loggedInUser ? (
                        <button
                          className="btn btn-outline-primary rounded-0 px-4"
                          onClick={() => addToCart(productId)}
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <Link
                          to="/login"
                          className="btn btn-outline-primary rounded-0 px-4"
                        >
                          Add to Cart
                        </Link>
                      )
                    ) : (
                      <Link
                        className="btn btn-outline-primary rounded-0 px-4"
                        to={loggedInUser ? "/cart" : "/login"}
                      >
                        Go To Cart
                      </Link>
                    )}
                  </section>

                  <section className="mt-4">
                    <h6>Delivered by</h6>
                    <p className="mb-2">{product.delivery.by}</p>
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
                        {product.delivery.type} from{" "}
                        {product.delivery.from.city} -{" "}
                        {product.delivery.from.country}
                      </small>
                    </p>
                  </section>
                </div>
              </div>
            </div>

            <div className="col-md-7">
              <h2 className="fw-normal">{product.name}</h2>
              <p className="fw-bold text-secondary">
                {product.rating}{" "}
                <span className="bi-star-fill text-warning"></span>
              </p>
              <div className="mt-2 d-flex justify-content-start align-items-end">
                <p className="fs-5 fw-bolder mb-0">₹{product.sellingPrice}</p>
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

              <hr />
              <div className="d-flex justify-content-start align-items-center">
                <img
                  src={product.artist.profilePic}
                  alt={product.artist.name}
                  className="img-fluid rounded-circle border border-light-subtle border-4"
                  style={{ width: "100px" }}
                />
                <div className="ms-3">
                  <p className="mb-2 fs-5 fw-semi-bold">
                    {product.artist.name}{" "}
                    <span className="text-secondary">
                      ({product.artist.noOfFollowers} fans)
                    </span>
                  </p>
                  <button className="btn btn-sm btn-secondary">+ Follow</button>
                </div>
              </div>
              <hr />
              <section>
                <h5>Details</h5>
                <p className="mb-1">
                  <span className="fw-semi-bold text-secondary">
                    Description:
                  </span>{" "}
                  {product.description}
                </p>
                <p className="mb-1">
                  <span className="text-secondary">Dimensions:</span>{" "}
                  {product.dimensions}
                </p>
                <p className="mb-1">
                  <span className="text-secondary">Framing:</span>{" "}
                  {product.isFramed ? "Yes" : "No"}
                </p>
                <p className="mb-1">
                  <span className="fw-semi-bold text-secondary">
                    Year of Making:
                  </span>{" "}
                  {product.yearOfMaking.getFullYear()}
                </p>
                <p className="mb-1">
                  <span className="text-secondary">State of Preservation:</span>{" "}
                  {product.stateOfPreservation}
                </p>
                <p className="mb-1">
                  <span className="text-secondary">Guarantee:</span>{" "}
                  {product.proofOfAuthenticity}
                </p>
                <p className="mb-1 text-secondary">Tags:</p>
                {product.tags.map((tag) => (
                  <button
                    key={tag}
                    className="my-2 mx-1 btn btn-text text-black bg-secondary-subtle rounded-pill text-light"
                  >
                    {tag}
                  </button>
                ))}
              </section>
              <hr />
              <section className="mt-4">
                <div className="btn-group z-0">
                  <button
                    className={`btn ${
                      otherDetails === "additional info"
                        ? "btn-secondary"
                        : "btn-outline-secondary"
                    }`}
                    onClick={() => setOtherDetails("additional info")}
                  >
                    Additional Information
                  </button>
                  <button
                    className={`btn ${
                      otherDetails === "artist bio"
                        ? "btn-secondary"
                        : "btn-outline-secondary"
                    }`}
                    onClick={() => setOtherDetails("artist bio")}
                  >
                    Artist Biography
                  </button>
                  <button
                    className={`btn ${
                      otherDetails === "qna & comments"
                        ? "btn-secondary"
                        : "btn-outline-secondary"
                    }`}
                    onClick={() => setOtherDetails("qna & comments")}
                  >
                    Questions or Comments
                  </button>
                </div>
                <div className="ms-2">
                  {otherDetails === "additional info" ? (
                    <div className="ms-0 row w-75 my-4 border border-bottom-0 rounded bg-white">
                      {Object.keys(product.additionalInfo).map((infoKey) => (
                        <Fragment key={infoKey}>
                          <div className="col-4 border-end border-bottom py-2 fw-bold text-secondary">
                            {infoKey.charAt(0).toUpperCase()}
                            {infoKey.slice(1).toLowerCase()}
                          </div>
                          <div className="col-8 text-start border-bottom py-2">
                            {product.additionalInfo[infoKey]}
                          </div>
                        </Fragment>
                      ))}
                    </div>
                  ) : otherDetails === "artist bio" ? (
                    <div className="card w-75 my-4">
                      <div className="card-body">
                        <p className="card-text">{product.artist.bio}</p>
                      </div>
                    </div>
                  ) : (
                    product.comments.map((comment) => (
                      <div key={comment.id} className="card w-75 my-4">
                        <div className="card-body">
                          <h5 className="card-title fs-6">
                            {comment.authorId}
                          </h5>
                          <p className="card-text">{comment.content}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
          </div>

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
