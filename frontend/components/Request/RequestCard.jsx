import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../common/Button";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const RequestCard = ({ request, type, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isIncoming = type === "incoming";
  const item = request.requirementId || request.offerId;
  const userToShow = isIncoming ? request.senderId : request.receiverId;

  // Don't render card if essential data is missing
  if (!item || !userToShow) return null;

  const statusBadgeColor = {
    Pending: "bg-yellow-100 text-yellow-800",
    Accepted: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
    Contracted: "bg-green-100 text-green-800",
  };

  const handleStatusUpdate = async (status) => {
    try {
      const response = await fetch(`${BASE_URL}/requests/${request._id}`, {
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
        onUpdate(request._id, status);
      } else {
        toast.error(result.message || "Failed to update status.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the request.");
    }
  };

  const DetailsModal = () => (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-40 flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl z-50 w-full max-w-lg relative">
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-2 text-4xl right-2 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Request Details
        </h2>
        <div className="space-y-3 text-gray-700">
          <p><strong>Crop:</strong> {item.crop}</p>
          <p><strong>Quantity:</strong> {item.quantity}</p>
          <p><strong>Expected Price:</strong> {item.expectedPrice}</p>
          {item.expectedPrice && <p><strong>Price:</strong> {item.expectedPrice}</p>}
          {item.expectedDuration && <p><strong>Duration:</strong> {item.expectedDuration}</p>}
          {item.neededBy && <p><strong>Needed By:</strong> {new Date(item.neededBy).toLocaleDateString()}</p>}
          <p><strong>Location:</strong> {item.location}</p>
          {item.description && <p><strong>Info:</strong> {item.description}</p>}
          <hr className="my-4"/>
          <p><strong>{isIncoming ? "From:" : "To:"}</strong> {userToShow.name}</p>
          {/* <p><strong>Status:</strong> {userToShow.isVerified ? "Verified" : "Not Verified"}</p> */}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between h-full hover:scale-105 transition-transform duration-500 hover:shadow-lg">
        <div>
          {/* Card Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{item.crop}</h3>
              <p className="text-sm text-gray-500">
                {isIncoming ? "From:" : "To:"}{" "}
                <strong>{userToShow.name}</strong>
              </p>
            </div>
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                statusBadgeColor[request.status]
              }`}
            >
              {request.status}
            </span>
          </div>
        </div>
        {/* Card Footer Actions */}
        <div className="flex justify-end items-center space-x-2 mt-6">
          <Button onClick={() => setIsModalOpen(true)}>View Details</Button>
          {isIncoming && request.status === "Pending" && (
            <>
              <Button onClick={() => handleStatusUpdate("Accepted")}>Accept</Button>
              <Button onClick={() => handleStatusUpdate("Rejected")} variant="danger">
                Reject
              </Button>
            </>
          )}
          {isIncoming && request.status === "Accepted" && (
            <Button to={`/create-contract/${request._id}`}>Create Contract</Button>
          )}
        </div>
      </div>

      {/* The Modal */}
      {isModalOpen && <DetailsModal />}
    </>
  );
};

export default RequestCard;

