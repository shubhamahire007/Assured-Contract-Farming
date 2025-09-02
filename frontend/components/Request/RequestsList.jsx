import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import RequestCard from "./RequestCard"; // Import the new component

const BASE_URL = import.meta.env.VITE_BASE_URL;

const RequestsList = () => {
  const [requests, setRequests] = useState([]);
  const { isLoading, setLoading, user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  // Function to update the status of a request in the local state
  const handleUpdateRequestInState = (requestId, newStatus) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req._id === requestId ? { ...req, status: newStatus } : req
      )
    );
  };

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/requests`, {
          headers: {
            // Authorization: `Bearer ${user.token}`,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        console.log(result.data)
        if (result.success) {
          const validRequests = result.data.filter(
            (req) => req.senderId && req.receiverId && (req.requirementId || req.offerId)
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
  }, [user, setLoading, setUser, navigate]);

  if (isLoading) {
    return <div className="flex justify-center p-8"><CircularProgress /></div>;
  }
  
  if (!user) {
    return null;
  }

  const incomingRequests = requests.filter((r) => r.receiverId._id === user.id);
  const sentRequests = requests.filter((r) => r.senderId._id === user.id);

  return (
    <div className="space-y-12">
      {/* Incoming Requests Section */}
      <div>
        <h2 className="mt-6 text-2xl font-bold mb-6">Incoming Requests</h2>
        {incomingRequests.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium">You have no incoming requests.</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {incomingRequests.map((req) => (
              <RequestCard 
                key={req._id} 
                request={req} 
                type="incoming" 
                onUpdate={handleUpdateRequestInState} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Sent Requests Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Sent Requests</h2>
        {sentRequests.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium">You have not sent any requests.</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sentRequests.map((req) => (
              <RequestCard 
                key={req._id} 
                request={req} 
                type="sent" 
                onUpdate={handleUpdateRequestInState} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestsList;
