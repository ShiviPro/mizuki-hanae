const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container my-2">
          <a href="" className="navbar-brand">
            Mizuki Hanae
          </a>

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
                <a className="nav-link" href="">
                  <span className="btn btn-primary">Login</span>
                </a>
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link" href="">
                  <span className="bi bi-heart fs-4 position-relative">
                    <span className="badge text-bg-danger px-1 py-0 rounded-pill position-absolute start-100 bottom-50 translate-middle-x">
                      <small>0</small>
                    </span>
                  </span>{" "}
                  <span className="ms-2">Wishlist</span>
                </a>
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link" href="">
                  <span className="bi bi-cart3 fs-4 position-relative">
                    <span className="badge text-bg-danger px-1 py-0 rounded-pill position-absolute start-100 bottom-50 translate-middle-x">
                      <small>0</small>
                    </span>
                  </span>{" "}
                  <span className="ms-2">Cart</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
