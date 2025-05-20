const ProductListing = ({ product }) => {
  return (
    <section className="card border-0 bg-white">
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
    </section>
  );
};

export default ProductListing;
