import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import UserContext from "../contexts/UserContext";

export const users = [
  {
    username: "default",
    name: {
      first: "Default",
      last: "User",
    },
    emailId: "default@gmail.com",
    password: "12345678",
    phoneNo: "1234567890",
    addresses: [
      {
        houseNo: "Apartment 4",
        streetName: "Untitled Street",
        city: "Some City",
        state: "Some State",
        country: "India",
        pincode: 216223,
      },
    ],
    orders: [
      {
        id: 1,
        items: [
          {
            id: 1,
            quantity: 1,
          },
          {
            id: 5,
            quantity: 2,
          },
        ],
        payableAmt: 8299,
      },
      {
        id: 2,
        items: [
          {
            id: 7,
            quantity: 1,
          },
          {
            id: 4,
            quantity: 1,
          },
        ],
        payableAmt: 8299,
      },
    ],
  },
];

const Login = () => {
  const { setLoggedInUser } = useContext(UserContext);
  const [emailInput, setEmailInput] = useState("");
  const [passwdInput, setPasswdInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successStatus, setSuccessStatus] = useState(false);

  const authenticateUser = (event) => {
    event.preventDefault();

    const user = users.find(
      (user) => user.emailId === emailInput && user.password === passwdInput
    );

    if (user) {
      setEmailInput("");
      setPasswdInput("");
      setSuccessStatus(true);
      setErrorMsg("");
      sessionStorage.setItem("login", user.username);
      setLoggedInUser(user.username);
    } else {
      setEmailInput("");
      setPasswdInput("");
      setErrorMsg("Invalid Email/Password. Please try again.");
      setSuccessStatus(false);
    }
  };

  document.querySelector("title").textContent = "Login | Mizuki Hanae";

  return (
    <>
      <Header />
      <main className="bg-body-tertiary">
        <div className="container vh-100 d-flex justify-content-between align-items-center position-relative">
          <section className="col-md-4 mx-auto bg-dark text-light rounded">
            <form className="p-4" onSubmit={authenticateUser}>
              <div>
                <label htmlFor="emailInput" className="fs-5">
                  Email:{" "}
                </label>
                <input
                  id="emailInput"
                  type="email"
                  className="form-control mt-1 fs-5"
                  value={emailInput}
                  onChange={(event) => setEmailInput(event.target.value)}
                />
              </div>
              <br />
              <div>
                <label htmlFor="passwdInput" className="fs-5">
                  Password:{" "}
                </label>
                <input
                  id="passwdInput"
                  type="password"
                  value={passwdInput}
                  className="form-control mt-1 fs-5"
                  onChange={(event) => setPasswdInput(event.target.value)}
                />
              </div>
              <div className="d-grid mt-4 pt-2">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary fs-5 py-2"
                />
              </div>
            </form>
          </section>
          {errorMsg && (
            <p className="alert alert-danger position-absolute bottom-0 text-center start-50 translate-middle-x">
              {errorMsg}
            </p>
          )}
          {successStatus && (
            <p className="alert alert-success position-absolute bottom-0 text-center start-50 translate-middle-x">
              Logged In Successfully. <Link to="/">Click Here</Link> to go to
              Homepage
            </p>
          )}
        </div>
      </main>
    </>
  );
};

export default Login;
