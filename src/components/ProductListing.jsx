const ProductListing = ({ product }) => {
  return (
    <section className="card border-0 bg-white position-relative">
      <img
        src={product.images[0]}
        alt={product.name}
        className="card-img-top"
      />
      <div className="card-body text-center">
        <h6 className="card-title">{product.name}</h6>
        <p className="card-text text-primary fw-bold mb-1">
          {product.rating}{" "}
          <small>
            <i className="bi bi-star-fill"></i>
          </small>
        </p>
        <p className="card-text fs-5 fw-bold">₹{product.price}</p>
      </div>
      <div className="d-grid">
        <button className="btn btn-primary rounded-0 rounded-bottom">
          Add/Go To Cart
        </button>
      </div>
      <span className="bi bi-heart position-absolute end-0 mt-2 me-3 fs-5 fw-bold text-danger"></span>
    </section>
  );
};

export default ProductListing;
