import { useState, useEffect } from "react";
import Requirement from "./Requirement.jsx";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const RequirementsList = () => {
  const buyerId = localStorage.getItem("id") || "";
  const token = localStorage.getItem("token") || "";
  const role = localStorage.getItem("role") || "";
  const [requirements, setRequirements] = useState([]);

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/requirements/buyer/${buyerId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        if (result.success) {
          setRequirements(result.data);
        } else {
          setRequirements([]);
        }
      } catch (error) {
        console.error("Error fetching requirements:", error);
        setRequirements([]);
      }
    };

    const fetchAllRequirements = async () => {
        try {
          const response = await fetch(`${BASE_URL}/requirements`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const result = await response.json();
          if (result.success) {
            setRequirements(result.data);
          } else {
            setRequirements([]);
          }
        } catch (error) {
          console.error("Error fetching all requirements:", error);
          setRequirements([]);
        }
    }
    if(role === "Farmer")
        fetchAllRequirements();
    if(role === "Buyer")
        fetchRequirements();
  }, []);

  const onDelete = (id) => {
    const deleteRequirement = async () => {
      const response = await fetch(`${BASE_URL}/requirements/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        setRequirements(requirements.filter((req) => req._id !== id));
        toast.success("Requirement deleted successfully");
      }
    };
    deleteRequirement();
  };

  return (
    <>
      {role == "Buyer" && <h2>My Requirements</h2>}
      {requirements.length === 0 ? (
        <p>No requirements found.</p>
      ) : (
        <ol>
          {requirements.map((req, idx) => (
            <Requirement
              key={req._id}
              crop={req.crop}
              quantity={req.quantity}
              expectedPrice={req.expectedPrice}
              neededBy={req.neededBy}
              id={req._id}
              idx={idx}
              onDelete={onDelete}
            />
          ))}
        </ol>
      )}
    </>
  );
};

export default RequirementsList;
