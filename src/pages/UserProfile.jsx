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

  const ProfileInfo = () => (
    <>
      <h2>Personal Information</h2>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          value={currentUser.name.first}
          readOnly
          disabled
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input id="lastName" value={currentUser.name.last} readOnly disabled />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={currentUser.emailId}
          readOnly
          disabled
        />
      </div>
      <div>
        <label htmlFor="phone">Phone Number:</label>
        <input
          id="phone"
          type="number"
          value={currentUser.phoneNo}
          readOnly
          disabled
        />
      </div>
    </>
  );

  const AddressManager = () => {
    const [isNewAddressBeingAdded, setIsNewAddressBeingAdded] = useState(false);
    const [nameIn, setNameIn] = useState("");
    const [mobileNoIn, setMobileNoIn] = useState("");
    const [postalCodeIn, setPostalCodeIn] = useState("");
    const [houseNoIn, setHouseNoIn] = useState("");
    const [localityIn, setLocalityIn] = useState("");
    const [cityDistrictOrTownIn, setCityDistrictOrTownIn] = useState("");
    const [stateIn, setStateIn] = useState("");
    const [countryIn, setCountryIn] = useState("");
    const [landmarkIn, setLandmarkIn] = useState("");
    const [altMobileNoIn, setAltMobileNoIn] = useState("");
    const [addressTypeIn, setAddressTypeIn] = useState("");
    const [allAddresses, setAllAddresses] = useState(currentUser.addresses);

    const addrTypeHandler = (event) => setAddressTypeIn(event.target.value);

    const resetForm = () => {
      setCountryIn("");
      setNameIn("");
      setMobileNoIn("");
      setPostalCodeIn("");
      setHouseNoIn("");
      setLocalityIn("");
      setCityDistrictOrTownIn("");
      setStateIn("");
      setLandmarkIn("");
      setAltMobileNoIn("");
      setAddressTypeIn("");
    };

    const addrFormHandler = (event) => {
      event.preventDefault();

      const newAddress = {
        id:
          (currentUser.addresses[currentUser.addresses.length - 1]?.id ?? 0) +
          1,
        receiverName: nameIn,
        contactNo: mobileNoIn,
        houseNo: houseNoIn,
        streetNameOrLocality: localityIn,
        cityOrDistrictOrTown: cityDistrictOrTownIn,
        landmark: landmarkIn,
        pincode: postalCodeIn,
        state: stateIn,
        country: countryIn,
        altContactNo: altMobileNoIn,
        type: addressTypeIn,
      };

      setAllAddresses([...allAddresses, newAddress]);
      currentUser.addresses = [...allAddresses, newAddress];
      resetForm();
      setIsNewAddressBeingAdded(false);
    };

    const deleteAddress = (addressId) => {
      setAllAddresses(
        allAddresses.filter((address) => address.id != addressId)
      );
      currentUser.addresses = allAddresses.filter(
        (address) => address.id != addressId
      );
    };

    return (
      <>
        <h2 className="mb-4">Manage Addresses</h2>
        {isNewAddressBeingAdded || (
          <button
            className="btn btn-outline-primary"
            onClick={() => setIsNewAddressBeingAdded(true)}
          >
            ADD A NEW ADDRESS
          </button>
        )}
        {isNewAddressBeingAdded && (
          <section className="bg-primary-subtle p-4">
            <h6 className="text-primary fw-light">ADD A NEW ADDRESS</h6>
            <form className="col-9" onSubmit={addrFormHandler}>
              <div className="row g-2">
                <div className="col-12">
                  <input
                    placeholder="Country"
                    className="form-control"
                    value={countryIn}
                    required
                    onChange={(event) => setCountryIn(event.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    placeholder="Name"
                    className="form-control"
                    value={nameIn}
                    onChange={(event) => setNameIn(event.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    className="form-control"
                    value={mobileNoIn}
                    onChange={(event) => setMobileNoIn(event.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    placeholder="Postal Code"
                    className="form-control"
                    value={postalCodeIn}
                    onChange={(event) => setPostalCodeIn(event.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    placeholder="House Number"
                    className="form-control"
                    value={houseNoIn}
                    onChange={(event) => setHouseNoIn(event.target.value)}
                    required
                  />
                </div>
                <div className="col-12">
                  <textarea
                    placeholder="Locality (Street and Area)"
                    className="form-control"
                    value={localityIn}
                    onChange={(event) => setLocalityIn(event.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="col-md-6">
                  <input
                    placeholder="City/District/Town"
                    className="form-control"
                    value={cityDistrictOrTownIn}
                    onChange={(event) =>
                      setCityDistrictOrTownIn(event.target.value)
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    placeholder="State"
                    className="form-control"
                    value={stateIn}
                    onChange={(event) => setStateIn(event.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    placeholder="Landmark (Optional)"
                    className="form-control"
                    value={landmarkIn}
                    onChange={(event) => setLandmarkIn(event.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="tel"
                    placeholder="Alternate Phone (Optional)"
                    className="form-control"
                    value={altMobileNoIn}
                    onChange={(event) => setAltMobileNoIn(event.target.value)}
                  />
                </div>
                <div className="col-md-6 mt-3">
                  <label htmlFor="form-label">Address Type</label>
                  <br />
                  <input
                    className="form-check-input"
                    type="radio"
                    name="addrType"
                    value="Home"
                    checked={addressTypeIn === "Home"}
                    id="homeAddrType"
                    onChange={addrTypeHandler}
                  />{" "}
                  <label className="form-check-label" htmlFor="homeAddrType">
                    Home
                  </label>
                  <input
                    className="form-check-input ms-4"
                    type="radio"
                    name="addrType"
                    value="Work"
                    checked={addressTypeIn === "Work"}
                    id="workAddrType"
                    onChange={addrTypeHandler}
                  />{" "}
                  <label className="form-check-label" htmlFor="workAddrType">
                    Work
                  </label>
                </div>
              </div>
              <div className="col-md-10 mt-3">
                <div className="row">
                  <div className="d-grid col-6">
                    <button type="submit" className="btn btn-primary px-3 py-2">
                      SAVE
                    </button>
                  </div>
                  <div className="d-grid col-6">
                    <button
                      className="btn btn-outline-primary px-3 py-2"
                      onClick={() => {
                        resetForm();
                        setIsNewAddressBeingAdded(false);
                      }}
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </section>
        )}

        <ul className="mt-4 list-unstyled">
          <div className="row g-3">
            {allAddresses.map((address) => (
              <div key={address.id} className="col-md-6">
                <li className="p-3 bg-white rounded">
                  {address.type && (
                    <span
                      className="bg-secondary-subtle py-1 px-2 rounded text-secondary fw-bold"
                      style={{ fontSize: "12.5px" }}
                    >
                      <small>{address.type.toUpperCase()}</small>
                    </span>
                  )}
                  <h5 className="mt-2">
                    {address.receiverName}{" "}
                    <span className="ms-4">{address.contactNo}</span>
                  </h5>
                  <p>
                    {address.houseNo}, {address.streetNameOrLocality},{" "}
                    {address.cityOrDistrictOrTown}, {address.state},{" "}
                    {address.country} -{" "}
                    <span className="fw-bold">{address.pincode}</span>
                  </p>

                  <button className="btn btn-outline-primary me-3">
                    Update
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteAddress(address.id)}
                  >
                    <span className="bi bi-trash-fill"></span>
                  </button>
                </li>
              </div>
            ))}
          </div>
        </ul>
      </>
    );
  };

  return (
    <>
      <Header />
      <main className="mt-5 pt-5 bg-body-tertiary pb-3">
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
              <ProfileInfo />
            ) : sidebarSelection === "orders" ? (
              <OrderHistory />
            ) : (
              <AddressManager />
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default UserProfile;
