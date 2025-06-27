import { useState } from "react";
import { Link } from "react-router-dom";

const AddressManager = ({ currentUser, from = "" }) => {
  const [isNewAddressBeingAdded, setIsNewAddressBeingAdded] = useState(false);
  const [idOfAddressToUpdate, setIdOfAddressToUpdate] = useState("");
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
  const [currentAddressId, setCurrentAddressId] = useState(
    currentUser.currentAddressId || ""
  );

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

  const addNewAddress = () => {
    const newAddress = {
      id:
        (currentUser.addresses[currentUser.addresses.length - 1]?.id ?? 0) + 1,
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

  const addrFormHandler = (event) => {
    event.preventDefault();

    if (isNewAddressBeingAdded) addNewAddress();
    else if (idOfAddressToUpdate) updateAddress();
  };

  const updateAddress = () => {
    const updatedAddress = {
      id: idOfAddressToUpdate,
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

    const updatedAddressList = allAddresses.map((address) =>
      address.id == idOfAddressToUpdate ? updatedAddress : address
    );

    setAllAddresses(updatedAddressList);
    setIdOfAddressToUpdate("");
  };

  const deleteAddress = (addressId) => {
    setAllAddresses(allAddresses.filter((address) => address.id != addressId));
    currentUser.addresses = allAddresses.filter(
      (address) => address.id != addressId
    );
  };

  const setFormForAddress = (address) => {
    setCountryIn(address.country);
    setNameIn(address.receiverName);
    setMobileNoIn(address.contactNo);
    setPostalCodeIn(address.pincode);
    setHouseNoIn(address.houseNo);
    setLocalityIn(address.streetNameOrLocality);
    setCityDistrictOrTownIn(address.cityOrDistrictOrTown);
    setStateIn(address.state);
    setLandmarkIn(address.landmark);
    setAltMobileNoIn(address.altContactNo);
    setAddressTypeIn(address.type);
  };

  const formCancellationHandler = () => {
    resetForm();
    setIsNewAddressBeingAdded(false);
    setIdOfAddressToUpdate("");
  };

  return (
    <>
      <h2 className="mb-4">
        {from === "checkout" ? "Select a Delivery Address" : "Manage Addresses"}
      </h2>
      {isNewAddressBeingAdded || (
        <button
          className="btn btn-outline-primary mb-3"
          onClick={() => {
            formCancellationHandler();
            setIsNewAddressBeingAdded(true);
          }}
        >
          ADD A NEW ADDRESS
        </button>
      )}
      {(isNewAddressBeingAdded || idOfAddressToUpdate) && (
        <section className="bg-primary-subtle p-4">
          <h6 className="text-primary fw-light">{`${
            isNewAddressBeingAdded
              ? "ADD A NEW ADDRESS"
              : "UPDATE EXISTING ADDRESS"
          }`}</h6>
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
                    {`${isNewAddressBeingAdded ? "SAVE" : "UPDATE"}`}
                  </button>
                </div>
                <div className="d-grid col-6">
                  <button
                    className="btn btn-outline-primary px-3 py-2"
                    onClick={formCancellationHandler}
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
              <li
                className={`p-3 ${
                  from === "checkout" && currentAddressId == address.id
                    ? "bg-primary-subtle"
                    : "bg-white"
                } rounded`}
              >
                {from === "checkout" && currentAddressId == address.id && (
                  <p className="text-secondary mb-1">
                    <em>Currently selected</em>
                  </p>
                )}

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

                <button
                  className="btn btn-outline-primary me-3"
                  onClick={() => {
                    formCancellationHandler();
                    setIdOfAddressToUpdate(address.id);
                    setFormForAddress(address);
                  }}
                >
                  Update
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => deleteAddress(address.id)}
                >
                  <span className="bi bi-trash-fill"></span>
                </button>
                {from === "checkout" && currentAddressId != address.id && (
                  <button
                    className="ms-3 btn btn-primary"
                    onClick={() => setCurrentAddressId(address.id)}
                  >
                    Deliver to this address
                  </button>
                )}
              </li>
            </div>
          ))}
        </div>
      </ul>
      {from == "checkout" && (
        <Link to="/order-summary" className="btn btn-primary">
          Proceed to Checkout
        </Link>
      )}
    </>
  );
};

export default AddressManager;
