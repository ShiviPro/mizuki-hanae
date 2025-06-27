import Header from "../components/Header";
import UserContext from "../contexts/UserContext";
import { useState, useContext } from "react";
import { users } from "./Login";
import { allProducts } from "./Products";
import { Link } from "react-router-dom";
import ReadableDate from "../components/ReadableDate";
import AddressManager from "../components/AddressManager";

const UserProfile = () => {
  const { loggedInUser } = useContext(UserContext);
  const [sidebarSelection, setSidebarSelection] = useState("profile");

  const currentUser = users.find((user) => user.username === loggedInUser);

  const OrderHistory = () => {
    const getRecentItem = (itemOne, itemTwo) => {
      // This function returns true if itemOne is more recently delivered than itemTwo or false if otherwise.
      const dateOne = itemOne.delivery.estimatedDate;
      const dateTwo = itemTwo.delivery.estimatedDate;

      const yearOne = dateOne.getFullYear();
      const yearTwo = dateTwo.getFullYear();

      const monthOne = dateOne.getMonth() + 1;
      const monthTwo = dateTwo.getMonth() + 1;

      const dayOne = dateOne.getDate();
      const dayTwo = dateTwo.getDate();

      if (yearOne > yearTwo) {
        return true;
      } else if (yearOne === yearTwo && monthOne > monthTwo) {
        return true;
      } else if (
        yearOne === yearTwo &&
        monthOne === monthTwo &&
        dayOne > dayTwo
      ) {
        return true;
      } else {
        return false;
      }
    };

    const sortByDeliveryDate = (order) => {
      const items = [...order];

      for (let i = 0; i < items.length; i++) {
        let mostRecentItemIndex = i;
        for (let j = i + 1; j < items.length; j++) {
          if (getRecentItem(items[j], items[mostRecentItemIndex])) {
            mostRecentItemIndex = j;
          }
        }
        const temp = items[mostRecentItemIndex];
        items[mostRecentItemIndex] = items[i];
        items[i] = temp;
      }

      return items;
    };

    const allOrders = currentUser.orders.reduce((acc, order) => {
      for (let i = 0; i < order.items.length; i++) {
        const currentItem = allProducts.find(
          (prod) => prod.id === order.items[i].id
        );
        acc = [...acc, currentItem];
      }
      return acc;
    }, []);

    return (
      <>
        <h2>My Orders</h2>
        <ul className="list-group mt-4">
          {sortByDeliveryDate(allOrders).map((item) => (
            <li key={item.id} className="list-group-item p-0">
              <div className="row">
                <div className="col-md-3">
                  <img
                    className="img-fluid p-3 pe-0"
                    src={
                      allProducts.find((product) => product.id == item.id)
                        .images[0]
                    }
                    alt={
                      allProducts.find((product) => product.id == item.id).name
                    }
                  />
                </div>
                <div className="col-md-9 p-3">
                  <div className="row pe-3">
                    <div className="col-6">
                      <Link className="card-title" to={`/products/${item.id}`}>
                        {
                          allProducts.find((product) => product.id == item.id)
                            .name
                        }{" "}
                        by{" "}
                        {
                          allProducts.find((product) => product.id == item.id)
                            .artist.name
                        }
                      </Link>
                    </div>
                    <div className="col-3 text-center">
                      <p>
                        ₹
                        {
                          allProducts.find((product) => product.id == item.id)
                            .sellingPrice
                        }
                      </p>
                    </div>
                    <div className="col-3 text-center">
                      <p>
                        Delivered on{" "}
                        <ReadableDate
                          date={
                            allProducts.find((product) => product.id == item.id)
                              .delivery.estimatedDate
                          }
                        />
                      </p>
                      <p>
                        <i className="bi bi-star-fill"></i> Rate or Review
                        Artwork
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  };

  const ProfileInfo = () => (
    <>
      <h2 className="mb-4">Personal Information</h2>
      <div className="row gy-3">
        <div className="col-4">
          <label htmlFor="firstName">First Name:</label>
        </div>
        <div className="col-6">
          <input
            id="firstName"
            value={currentUser.name.first}
            className="form-control"
            readOnly
            disabled
          />
        </div>
        <div className="col-2"></div>
        <div className="col-4">
          <label htmlFor="lastName">Last Name:</label>
        </div>
        <div className="col-6">
          <input
            id="lastName"
            value={currentUser.name.last}
            className="form-control"
            readOnly
            disabled
          />
        </div>
        <div className="col-2"></div>
        <div className="col-4">
          <label htmlFor="email">Email:</label>
        </div>
        <div className="col-6">
          <input
            id="email"
            type="email"
            value={currentUser.emailId}
            className="form-control"
            readOnly
            disabled
          />
        </div>
        <div className="col-2"></div>
        <div className="col-4">
          <label htmlFor="phone">Phone Number:</label>
        </div>
        <div className="col-6">
          <input
            id="phone"
            type="number"
            value={currentUser.phoneNo}
            className="form-control"
            readOnly
            disabled
          />
        </div>
        <div className="col-2"></div>
      </div>
    </>
  );

  return (
    <>
      <Header />
      <main className="mt-5 pt-5 bg-body-tertiary pb-3">
        <div className="container">
          <div className="row">
            <aside className="col-4">
              <section className="bg-white p-2 mb-3">
                <div className="d-flex align-items-center">
                  <div>
                    <img
                      className="img-fluid rounded-circle"
                      src={`https://placehold.co/50?text=${loggedInUser}`}
                      alt={loggedInUser}
                    />
                  </div>
                  <div className="ms-3">
                    <p className="fw-light mb-0">
                      <small>Hello, </small>
                    </p>
                    <p className="mb-0">
                      {currentUser.name.first} {currentUser.name.last}
                    </p>
                  </div>
                </div>
              </section>
              <section className="bg-white">
                <div className="d-grid">
                  <a
                    href="#"
                    className={`p-3 fw-bold text-decoration-none ${
                      sidebarSelection === "orders"
                        ? "link link-primary bg-primary-subtle"
                        : "link link-secondary"
                    }`}
                    onClick={() => setSidebarSelection("orders")}
                  >
                    My Orders
                  </a>
                </div>
                <div className="d-grid">
                  <a
                    href="#"
                    className={`p-3 fw-bold text-decoration-none ${
                      sidebarSelection === "profile"
                        ? "link link-primary bg-primary-subtle"
                        : "link link-secondary"
                    }`}
                    onClick={() => setSidebarSelection("profile")}
                  >
                    Profile Information
                  </a>
                </div>
                <div className="d-grid">
                  <a
                    href="#"
                    className={`p-3 fw-bold text-decoration-none ${
                      sidebarSelection === "addresses"
                        ? "link link-primary bg-primary-subtle"
                        : "link link-secondary"
                    }`}
                    onClick={() => setSidebarSelection("addresses")}
                  >
                    Manage Addresses
                  </a>
                </div>
              </section>
            </aside>
            <section className="col-8">
              {sidebarSelection === "profile" ? (
                <ProfileInfo />
              ) : sidebarSelection === "orders" ? (
                <OrderHistory />
              ) : (
                <AddressManager currentUser={currentUser} />
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default UserProfile;
