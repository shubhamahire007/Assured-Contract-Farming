import { useEffect, useState } from "react";
import Offer from "./Offer";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const OffersList = () => {
  const { isLoading, setLoading, role, user, setUser } = useContext(AppContext);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      if (!user || !user.role) return;
      const endpoint =
        role == "Farmer"
          ? `${BASE_URL}/offers/farmer/${user.id}`
          : `${BASE_URL}/offers`;
      try {
        setLoading(true);
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });
        if (!response.ok && response.status === 401) {
          localStorage.clear();
          setUser(null);
          toast.error("Your session has expired.");
          navigate("/login");
        }
        const result = await response.json();
        if (result.success) {
          setOffers(result.data);
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
        setOffers([]);
      }
      setLoading(false);
    };
    if (!role) {
      setOffers([]);
      return;
    }
    fetchOffers();
  }, [user, role]);

  const onDelete = (id) => {
    const deleteOffer = async () => {
      try {
        console.log(id);
        const response = await fetch(`${BASE_URL}/offers/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });
        if (response.ok) {
          setOffers((prevOffers) =>
            prevOffers.filter((offer) => offer._id !== id)
          );
          toast.success("Offer deleted successfully.");
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || "Error deleting offer.");
        }
      } catch (error) {
        console.error("Error deleting offer:", error);
        toast.error("Error deleting offer.");
      }
    };
    deleteOffer();
  };

  return (
    <div>
      <br />
      {offers.length == 0 ? (
        <p>No Offers </p>
      ) : (
        <>
          {offers.map((offer) => (
            <Offer
              id={offer._id}
               {...offer}
              onDelete={onDelete}
            />
            
          ))}
        </>
      )}
    </div>
  );
};

export default OffersList;
