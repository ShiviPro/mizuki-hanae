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

  const getCartMarkedPrice = () => {
    const totalMP = cart.reduce((acc, item) => {
      const unitMP = item.product.markedPrice;
      const quantity = item.quantity;
      return acc + unitMP * quantity;
    }, 0);

    return totalMP;
  };

  const getCartDiscount = () => {
    const totalDiscount = cart.reduce((acc, item) => {
      const unitDiscount = item.product.markedPrice - item.product.sellingPrice;
      const quantity = item.quantity;
      return acc + unitDiscount * quantity;
    }, 0);

    return totalDiscount;
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
                          <div className="d-flex justify-content-start align-items-end">
                            <p className="card-text fs-5 fw-bold mb-0">
                              ₹{entry.product.sellingPrice}
                            </p>
                            <p className="card-text fs-6 mb-0 ms-2 text-secondary">
                              <strike>₹{entry.product.markedPrice}</strike>
                            </p>
                          </div>
                          <p className="fs-5 fw-bold text-secondary">
                            {Math.round(
                              ((entry.product.markedPrice -
                                entry.product.sellingPrice) /
                                entry.product.markedPrice) *
                                100
                            )}
                            % off
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
                    <div className="col-6 text-end">
                      ₹{getCartMarkedPrice()}
                    </div>
                    <div className="col-6">Discount</div>
                    <div className="col-6 text-end">-₹{getCartDiscount()}</div>
                    <div className="col-6">Delivery Charges</div>
                    <div className="col-6 text-end">
                      ₹{getCartDeliveryCharge()}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-6 fw-bold">Total Amount</div>
                    <div className="col-6 fw-bold text-end">
                      ₹
                      {getCartMarkedPrice() -
                        getCartDiscount() +
                        getCartDeliveryCharge()}
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
