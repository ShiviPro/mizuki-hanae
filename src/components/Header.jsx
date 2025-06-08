import { NavLink } from "react-router-dom";
import { useContext } from "react";
import WishlistContext from "../contexts/WishlistContext";
import CartContext from "../contexts/CartContext";

const Header = () => {
  const { wishlist } = useContext(WishlistContext);
  const { getCartQuantity } = useContext(CartContext);

  return (
    <header className="position-fixed w-100 top-0 z-1">
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container">
          <NavLink to="/" className="navbar-brand">
            Mizuki Hanae
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div id="navbarNav" className="navbar-collapse collapse">
            <div className="input-group w-25 mx-auto">
              <input className="form-control" placeholder="Search" />
              <button className="btn btn-outline-light">
                <i className="bi bi-search"></i>
              </button>
            </div>
            <ul className="navbar-nav text-center">
              <li className="nav-item mx-3">
                <NavLink className="nav-link" to="">
                  <span className="btn btn-primary">Login</span>
                </NavLink>
              </li>
              <li className="nav-item mx-3">
                <NavLink className="nav-link" to="/wishlist">
                  <span className="bi bi-heart fs-4 position-relative">
                    <span className="badge text-bg-danger px-1 py-0 rounded-pill position-absolute start-100 bottom-50 translate-middle-x">
                      <small>{wishlist.length}</small>
                    </span>
                  </span>{" "}
                  <span className="ms-2">Wishlist</span>
                </NavLink>
              </li>
              <li className="nav-item mx-3">
                <NavLink className="nav-link" to="/cart">
                  <span className="bi bi-cart3 fs-4 position-relative">
                    <span className="badge text-bg-danger px-1 py-0 rounded-pill position-absolute start-100 bottom-50 translate-middle-x">
                      <small>{getCartQuantity()}</small>
                    </span>
                  </span>{" "}
                  <span className="ms-2">Cart</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
