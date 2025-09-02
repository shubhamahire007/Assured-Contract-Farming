import { useEffect, useState } from "react";
import Offer from "./Offer";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const OffersList = () => {
  const { isLoading, setLoading, role, user, setUser, offers, setOffers } =
    useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      if (!user || !user.role) return;
      const endpoint =
        role === "Farmer"
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
          return;
        }
        const result = await response.json();
        console.log(result.data)
        if (result.success) {
          setOffers(result.data);
        } else {
          setOffers([]);
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };
    if (!role) {
      setOffers([]);
      return;
    }
    fetchOffers();
  }, [user, role, setOffers, setLoading, setUser, navigate]);

  const onDelete = (id) => {
    const deleteOffer = async () => {
      try {
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
          if (response.status === 401) {
            localStorage.clear();
            setUser(null);
            toast.error("Your session has expired.");
            navigate("/login");
            return;
          }
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

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      {role === "Farmer" && (
        <h2 className="mt-10 text-2xl font-bold mb-6">My Offers</h2>
      )}
      {offers.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-medium">No offers found.</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <Offer
              key={offer._id}
              {...offer}
              id={offer._id}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OffersList;
