import { useState, useEffect } from "react";
import Requirement from "./Requirement.jsx";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const RequirementsList = () => {
  const token = localStorage.getItem("token") || "";
  const [requirements, setRequirements] = useState([]);
  const { isLoading, setLoading, role, user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequirements = async () => {
      if (!user.role || !user) return;
      const endpoint =
        role == "Buyer"
          ? `${BASE_URL}/requirements/buyer/${user.id}`
          : `${BASE_URL}/requirements`;
      try {
        setLoading(true);
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
          setRequirements(result.data);
        } else {
          setRequirements([]);
        }
      } catch (error) {
        console.error("Error fetching requirements:", error);
        setRequirements([]);
      } finally {
        setLoading(false);
      }
    };
    if (!role) {
      setRequirements([]);
      return;
    }
    fetchRequirements();
  }, [user, setUser, role, token, setLoading, navigate]);

  const onDelete = (id) => {
    const deleteRequirement = async () => {
      const response = await fetch(`${BASE_URL}/requirements/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        localStorage.clear();
        setUser(null);
        toast.error("Your session has expired.");
        navigate("/login");
        return;
      }
      const result = await response.json();
      if (result.success) {
        setRequirements(requirements.filter((prevReq) => prevReq._id !== id));
        toast.success("Requirement deleted successfully");
      }
    };
    deleteRequirement();
  };

  return (
    <>
      {isLoading && (
        <div>
          <CircularProgress />
        </div>
      )}

      {role == "Buyer" && <h2>My Requirements</h2>}

      {!isLoading && requirements.length === 0 ? (
        <p>No requirements found.</p>
      ) : (
        <ol>
          {requirements.map((requirement, idx) => (
            <Requirement
              key={requirement._id}
              {...requirement}
              id={requirement._id}
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
