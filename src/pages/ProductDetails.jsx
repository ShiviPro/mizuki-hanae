import Header from "../components/Header";
import Footer from "../components/Footer";
import { allProducts } from "./Products";
import { useParams } from "react-router-dom";
import { useState, Fragment } from "react";

const ProductDetails = () => {
  const [otherDetails, setOtherDetails] = useState("additional info");
  const urlRouteParams = useParams();
  const productId = urlRouteParams["product-id"];
  const product = allProducts.find((product) => product.id == productId);
  const [currentlyViewedImage, setCurrentlyViewedImage] = useState(
    product.images[0]
  );

  return (
    <>
      <Header />
      <main className="mt-5 pb-5 bg-body-tertiary">
        <section className="text-center">
          <h2 className="py-5 mb-0 display-5">{product.name}</h2>
          <div className="row w-100">
            <div className="col-md-3">
              <section className="mb-4 px-3">
                <h5>Artist</h5>
                <img
                  src={product.artist.profilePic}
                  alt={product.artist.name}
                  className="w-50 rounded-circle border border-light-subtle border-4"
                />
                <p className="mb-0 fs-5 fw-semi-bold">{product.artist.name}</p>
                <button className="btn btn-link pt-1 pe-1 text-dark">
                  + Follow
                </button>
                <span className="text-secondary">
                  ({product.artist.noOfFollowers} fans)
                </span>
              </section>
              <section className="px-3">
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
                  <span className="text-secondary">State of Preservation:</span>{" "}
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
                <span className="bi bi-heart position-absolute end-0 mt-2 me-3 fs-5 fw-bold text-danger"></span>
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
              <section className="px-3">
                <h6>Sold & Delivered by</h6>
                <p className="mb-3">{product.delivery.by}</p>
                <p className="fs-5 fw-semi-bold mb-2">₹{product.price}</p>
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
                    {product.delivery.type} from {product.delivery.from.city} -{" "}
                    {product.delivery.from.country}
                  </small>
                </p>
              </section>
              <section className="mt-5 px-3">
                <button className="btn btn-outline-primary rounded-pill px-4 me-2">
                  Add to Cart
                </button>
                <button className="btn btn-primary rounded-pill px-4">
                  Buy Now
                </button>
              </section>
            </div>
          </div>
        </section>
        <section className="mt-5 text-center">
          <div className="btn-group">
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
      </main>
      <Footer />
    </>
  );
};

export default ProductDetails;
