import Header from "../components/Header";
import UserContext from "../contexts/UserContext";
import { useState, useContext } from "react";
import { users } from "./Login";
import { allProducts } from "./Products";
import { Link } from "react-router-dom";

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
        <ul className="list-group">
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
                        {allProducts
                          .find((product) => product.id == item.id)
                          .delivery.estimatedDate.toLocaleDateString()}
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

  return (
    <>
      <Header />
      <main className="mt-5 pt-5 bg-body-tertiary">
        <div className="container">
          <aside>
            <section className="bg-white">
              <div>
                <img
                  className="img-fluid rounded-circle"
                  src={`https://placehold.co/50?text=${loggedInUser}`}
                  alt={loggedInUser}
                />
              </div>
              <div>
                <p>Hello, </p>
                <p>
                  {currentUser.name.first} {currentUser.name.last}
                </p>
              </div>
            </section>
            <section className="bg-white">
              <div className="d-grid">
                <a
                  href="#"
                  className={`text-decoration-none ${
                    sidebarSelection === "orders"
                      ? "link link-primary bg-primary-subtle"
                      : "link link-dark"
                  }`}
                  onClick={() => setSidebarSelection("orders")}
                >
                  My Orders
                </a>
              </div>
              <div className="d-grid">
                <a
                  href="#"
                  className={`text-decoration-none ${
                    sidebarSelection === "profile"
                      ? "link link-primary bg-primary-subtle"
                      : "link link-dark"
                  }`}
                  onClick={() => setSidebarSelection("profile")}
                >
                  Profile Information
                </a>
              </div>
              <div className="d-grid">
                <a
                  href="#"
                  className={`text-decoration-none ${
                    sidebarSelection === "addresses"
                      ? "link link-primary bg-primary-subtle"
                      : "link link-dark"
                  }`}
                  onClick={() => setSidebarSelection("addresses")}
                >
                  Manage Addresses
                </a>
              </div>
            </section>
          </aside>
          <section>
            {sidebarSelection === "profile" ? (
              <>Personal Information</>
            ) : sidebarSelection === "orders" ? (
              <OrderHistory />
            ) : (
              <>Your Addresses</>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default UserProfile;
