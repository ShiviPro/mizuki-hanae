import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const FeaturedCategories = () => {
  return (
    <section className="row my-4">
      <Link
        to="/products?category=Abstract"
        className="col p-5 mx-3 text-center position-relative"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=250&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundPosition: "center",
        }}
      >
        <span className="position-absolute text-bg-dark w-100 top-50 translate-middle-y start-0 opacity-75 p-1">
          Abstract
        </span>
      </Link>
      <Link
        to="/products?category=Realism"
        className="col p-5 mx-3 text-center position-relative"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1596661893368-66e7d2510fa4?q=80&w=250&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundPosition: "center",
        }}
      >
        <span className="position-absolute text-bg-dark w-100 top-50 translate-middle-y start-0 opacity-75 p-1">
          Realism
        </span>
      </Link>
      <Link
        to="/products?category=Figurative"
        className="col p-5 mx-3 text-center position-relative"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1706999474920-837447b808e4?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundPosition: "center",
        }}
      >
        <span className="position-absolute text-bg-dark w-100 top-50 translate-middle-y start-0 opacity-75 p-1">
          Figurative
        </span>
      </Link>

      <Link
        to="/products?category=Portrait"
        className="col p-5 mx-3 text-center position-relative"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1643308991670-07ca538407f4?q=80&w=250&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundPosition: "center",
        }}
      >
        <span className="position-absolute text-bg-dark w-100 top-50 translate-middle-y start-0 opacity-75 p-1">
          Portrait
        </span>
      </Link>

      <Link
        to="/products?category=Niche+Art"
        className="col p-5 mx-3 text-center position-relative"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1729905878196-0f0aea1408e4?q=80&w=720&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundPosition: "center",
        }}
      >
        <span className="position-absolute text-bg-dark w-100 top-50 translate-middle-y start-0 opacity-75 p-1">
          Niche Art
        </span>
      </Link>
    </section>
  );
};

const CurrentOffers = () => {
  return (
    <section>
      <img
        src="https://placehold.co/5120x1500?text=An+Amazing+Offer"
        alt="Offer1"
        className="img-fluid"
      />
    </section>
  );
};

const Home = () => (
  <>
    <Header />
    <main className="mt-5 pb-5 bg-body-tertiary">
      <div className="container pt-4">
        <FeaturedCategories />
        <CurrentOffers />
      </div>
    </main>
    <Footer />
  </>
);

export default Home;
