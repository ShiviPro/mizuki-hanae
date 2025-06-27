import Header from "../components/Header";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import ProductListing from "../components/ProductListing";

const Wishlist = () => {
  const { wishlist } = useContext(UserContext);

  return (
    <>
      <Header />
      <main className="mt-5 py-5 bg-body-tertiary">
        <div className="container text-center">
          <h1 className="mb-4 display-5">My Wishlist</h1>
          <section className="row g-4">
            {wishlist.map((product) => (
              <div key={product.id} className="col-md-3">
                <ProductListing product={product} />
              </div>
            ))}
          </section>
        </div>
      </main>
    </>
  );
};

export default Wishlist;
