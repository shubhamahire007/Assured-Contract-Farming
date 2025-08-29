import RequirementsList from "../components/Requirement/RequirementsList";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import OffersList from "../components/Offer/OffersList";

const Home = () => {
  const { role } = useContext(AppContext);
  return (
    <div>
      <h1>Home</h1>
      <br /><br />
      {role == "Farmer" && (
        <>
          <h2>Buyers Requirements</h2>
          <RequirementsList />
        </>
      )}
      {role == "Buyer" && (
        <>
          <h2>Farmers Offers</h2>
          <OffersList />
        </>
      )}
    </div>
  );
};

export default Home;
