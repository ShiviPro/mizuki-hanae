import Header from "../components/Header";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import { users } from "./Login";
import ReadableDate from "../components/ReadableDate";
import { allProducts } from "./Products";

const OrderSummary = () => {
  const { loggedInUser, cart, removeFromCart } = useContext(UserContext);
  const currentUser = users.find((user) => user.username === loggedInUser);
  const currentShippingAddress = currentUser.addresses.find(
    (address) => address.id == currentUser.currentAddressId
  );
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const newOrder = {
    id: (currentUser.orders[currentUser.orders.length - 1]?.id ?? 0) + 1,
    dateOfPlacement: new Date(),
    items: cart.map((cartEntry) => ({
      id: cartEntry.product.id,
      quantity: cartEntry.quantity,
    })),
    shippingAddress: currentShippingAddress,
    invoice: "",
    estimatedDeliveryDate: new Date("2025-06-05"),
    returnWindow: "",
    packageTrackingId: "",
  };

  currentUser.orders.push(newOrder);

  return (
    <>
      <Header />
      <main className="mt-5 py-5 bg-body-tertiary">
        <div className="container">
          <div className="bg-white w-75 mx-auto rounded p-3">
            <section>
              <p className="text-success fw-bold fs-5">
                <i className="bi bi-check-circle-fill me-2"></i>Order placed,
                thank you!
              </p>
              <p>
                <span className="fw-bold">
                  Shipping to {newOrder.shippingAddress.receiverName},
                </span>{" "}
                {newOrder.shippingAddress.houseNo},{" "}
                {newOrder.shippingAddress.streetNameOrLocality},{" "}
                {newOrder.shippingAddress.cityOrDistrictOrTown},{" "}
                {newOrder.shippingAddress.state},{" "}
                {newOrder.shippingAddress.pincode},{" "}
                {newOrder.shippingAddress.country}
              </p>
            </section>
            <hr />
            <section>
              <p className="fw-bold mb-1">
                {daysOfWeek[newOrder.estimatedDeliveryDate.getDay()]},{" "}
                <ReadableDate date={newOrder.estimatedDeliveryDate} />
              </p>
              <p>Delivery Date</p>
            </section>
            <hr />
            <section>
              <ul className="list-group">
                {newOrder.items.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item bg-body-tertiary"
                  >
                    {item.quantity} x{" "}
                    {allProducts.find((product) => product.id == item.id).name}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default OrderSummary;
