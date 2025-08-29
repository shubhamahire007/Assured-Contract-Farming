import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const RequestsList = () => {
  const [requests, setRequests] = useState([]);
  const { isLoading, setLoading, user } = useContext(AppContext);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/requests`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await response.json();
        if (result.success) {
          const validRequests = result.data.filter(
            (req) =>
              req.senderId &&
              req.receiverId &&
              (req.requirementId || req.offerId)
          );
          setRequests(validRequests);
        } else {
          toast.error(result.message || "Failed to fetch requests.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching requests.");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [user, setLoading]);

  const handleStatusUpdate = async (requestId, status) => {
    try {
      const response = await fetch(`${BASE_URL}/requests/${requestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        // Update the request's status in the local state for an instant UI update
        setRequests((prevRequests) =>
          prevRequests.map((req) =>
            req._id === requestId ? { ...req, status: status } : req
          )
        );
      } else {
        toast.error(result.message || "Failed to update status.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the request.");
    }
  };
  if (!user) {
    return <CircularProgress />;
  }
  if (isLoading) {
    return <CircularProgress />;
  }

  const incomingRequests = requests.filter((r) => r.receiverId._id === user.id);
  const sentRequests = requests.filter((r) => r.senderId._id === user.id);

  return (
    <div>
      <h2>Incoming Requests</h2>
      {incomingRequests.length === 0 ? (
        <p>You have no incoming requests.</p>
      ) : (
        <ul>
          {incomingRequests.map((req) => (
            <li key={req._id}>
              From <strong>{req.senderId.name}</strong> (
              {req.senderId.isVerified ? "Verified" : "Not Verified"}) 
              Request for{" "}
              {req.requirementId
                ? ` ${req.requirementId.crop} - ${req.requirementId.quantity}`
                : ` ${req.offerId.crop} - ${req.offerId.quantity}`}
              <br />

              <span>Status: </span> <strong>{req.status}</strong>
              
              {req.status === "Pending" && (
                <div>
                  <button
                    onClick={() => handleStatusUpdate(req._id, "Accepted")}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(req._id, "Rejected")}
                  >
                    Reject
                  </button>
                </div>
              )}{" "}
              {"  "}
              {req.status == "Accepted" && <button> Create Contract</button>}
            </li>
          ))}
        </ul>
      )}

      <h2>Sent Requests</h2>
      {sentRequests.length === 0 ? (
        <p>You have not sent any requests.</p>
      ) : (
        <ul>
          {sentRequests.map((req) => (
            <li key={req._id}>
              Request to <strong>{req.receiverId.name}</strong> (
              {req.receiverId.isVerified ? "Verified" : "Not Verified"}) for a{" "}
              {req.requirementId
                ? `requirement of ${req.requirementId.crop}`
                : `offer of ${req.offerId.crop}`}
              <br />
              Status: <strong>{req.status}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RequestsList;
