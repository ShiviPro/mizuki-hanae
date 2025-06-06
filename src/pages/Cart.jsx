import Header from "../components/Header";
import { useContext } from "react";
import CartContext from "../contexts/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, isProductInCart, addToCart, removeFromCart } =
    useContext(CartContext);

  return (
    <>
      <Header />
      <main className="mt-5 py-5 bg-body-tertiary">
        <div className="container">
          <h1 className="display-5 text-center mb-4">My Cart</h1>
          <div>
            <section className="col-6">
              {cart.map((entry) => (
                <section key={entry.product.id} className="card my-3">
                  <div className="row">
                    <div className="col-5">
                      <img
                        className="card-img rounded rounded-end-0"
                        src={entry.product.images[0]}
                        alt={entry.product.name}
                      />
                    </div>
                    <div className="col-7">
                      <div className="card-body">
                        <Link
                          to={`/products/${entry.product.id}`}
                          className="link-dark link-underline link-underline-opacity-0 link-underline-opacity-50-hover"
                        >
                          <h6 className="card-title">{entry.product.name}</h6>
                        </Link>
                        <p className="card-text fs-5 fw-bold">
                          ₹{entry.product.price}
                        </p>
                        <div className="d-flex align-items-center justify-content-start mb-3">
                          <label className="card-text">Quantity: </label>

                          <div className="ms-3 input-group w-50">
                            <button
                              className="btn btn-secondary fw-bold py-1"
                              onClick={() => removeFromCart(entry.product.id)}
                            >
                              -
                            </button>
                            <input
                              className="form-control text-center"
                              type="number"
                              value={entry.quantity}
                            />
                            <button
                              className="btn btn-secondary fw-bold py-1"
                              onClick={() => addToCart(entry.product.id)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button className="btn btn-secondary w-100 mb-3">
                          Remove From Cart
                        </button>
                        <button className="btn btn-outline-secondary w-100">
                          Move To Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </section>
            <aside></aside>
          </div>
        </div>
      </main>
    </>
  );
};

export default Cart;
