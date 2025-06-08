import Header from "../components/Header";
import { useContext } from "react";
import CartContext from "../contexts/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    isProductInCart,
    addToCart,
    removeFromCart,
    incrementInCart,
    decrementInCart,
    getCartQuantity,
  } = useContext(CartContext);

  const getCartPrice = () => {
    const totalPrice = cart.reduce((acc, item) => {
      const unitPrice = item.product.price;
      const quantity = item.quantity;
      return acc + unitPrice * quantity;
    }, 0);

    return totalPrice;
  };

  const getCartDeliveryCharge = () => {
    const result = cart.reduce(
      (acc, item) => acc + item.product.delivery.charge * item.quantity,
      0
    );

    return result;
  };

  return (
    <>
      <Header />
      <main className="mt-5 py-5 bg-body-tertiary">
        <div className="container">
          <h1 className="display-5 text-center mb-4">
            My Cart ({getCartQuantity()})
          </h1>
          {!!cart.length && (
            <div className="row">
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
                                onClick={() =>
                                  decrementInCart(entry.product.id)
                                }
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
                                onClick={() =>
                                  incrementInCart(entry.product.id)
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <button
                            className="btn btn-secondary w-100 mb-3"
                            onClick={() => removeFromCart(entry.product.id)}
                          >
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
              <aside className="col-5 ms-auto">
                <div className="bg-white mt-3 p-4 rounded">
                  <h2>Price Details</h2>
                  <hr />
                  <div className="row">
                    <div className="col-6">
                      Price ({getCartQuantity()} item
                      {getCartQuantity() === 1 ? "" : "s"})
                    </div>
                    <div className="col-6 text-end">₹{getCartPrice()}</div>
                    <div className="col-6">Discount</div>
                    <div className="col-6 text-end">-₹0</div>
                    <div className="col-6">Delivery Charges</div>
                    <div className="col-6 text-end">
                      ₹{getCartDeliveryCharge()}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-6 fw-bold">Total Amount</div>
                    <div className="col-6 fw-bold text-end">
                      ₹{getCartPrice() + getCartDeliveryCharge()}
                    </div>
                  </div>
                  <div className="d-grid mt-4">
                    <button className="btn btn-primary">PLACE ORDER</button>
                  </div>
                </div>
              </aside>
            </div>
          )}
          {!!cart.length || (
            <section className="text-center alert alert-info fs-5 fw-semi-bold col-md-8 mx-auto">
              <p className="mb-2">Your cart is empty.</p>
              <p className="mb-0">
                Add the artwork you want, from{" "}
                <Link to="/products">Products</Link> page
              </p>
            </section>
          )}
        </div>
      </main>
    </>
  );
};

export default Cart;
