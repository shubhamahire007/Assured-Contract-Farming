import { useState, useEffect } from "react";
import Requirement from "./Requirement.jsx";
import {toast} from "react-toastify";
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

  const handleUpdateSuccess = (updatedRequirement) => {
    setRequirements((prevRequirements) =>
      prevRequirements.map((req) =>
        req._id === updatedRequirement._id ? updatedRequirement : req
      )
    );
  };

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

   if (isLoading) {
    return <div className="flex justify-center p-8"><CircularProgress /></div>;
  }

  return (
     <div>
      {role === "Buyer" && <h2 className="mt-10 text-2xl font-bold mb-6">My Requirements</h2>}

      {requirements.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium">No requirements found.</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requirements.map((requirement) => (
            <Requirement
              key={requirement._id}
              {...requirement}
              id={requirement._id}
              onDelete={onDelete}
              onUpdateSuccess={handleUpdateSuccess}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RequirementsList;
