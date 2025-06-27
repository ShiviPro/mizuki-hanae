import Header from "../components/Header";
import AddressManager from "../components/AddressManager";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { users } from "./Login";

const Checkout = () => {
  const { loggedInUser } = useContext(UserContext);
  const currentUser = users.find((user) => user.username === loggedInUser);

  return (
    <>
      <Header />
      <main className="mt-5 bg-body-tertiary pb-5">
        <div className="container pt-5">
          <AddressManager currentUser={currentUser} from="checkout" />
        </div>
      </main>
    </>
  );
};

export default Checkout;
