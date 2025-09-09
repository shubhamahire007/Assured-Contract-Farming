import UpdateRequirement from "./UpdateRequirement";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import Button from "../common/Button";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Requirement = (props) => {
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [requestStatus, setRequestStatus] = useState(props.requestStatus);
  const { role } = useContext(AppContext);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this requirement?")) {
      props.onDelete(props.id);
    }
  };

  const handleSendRequest = async () => {
    if (!confirm("Are you sure you want to send this request?")) return;

    try {
      const response = await fetch(`${BASE_URL}/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ requirementId: props.id }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        setRequestStatus("Pending");
      } else {
        toast.error(result.message || "Failed to send request.");
      }
    } catch (error) {
      console.error("Error sending request:", error);
      toast.error("An error occurred while sending the request.");
    }
  };

  const renderRequestButton = () => {
    if (role !== "Farmer") return null;

    switch (requestStatus) {
      case "Pending":
        return <Button disabled>Request Sent</Button>;
      case "Accepted":
        return <Button disabled>Accepted</Button>;
      case "Rejected":
        return (
          <Button disabled variant="danger">
            Rejected
          </Button>
        );
      case "Contracted":
        return <Button disabled>Contracted</Button>;
      default:
        return <Button onClick={handleSendRequest}>Apply for Contract</Button>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
      <div>
        {/* Card Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{props.crop}</h3>
            {role !== "Buyer" && (
              <p className="text-sm text-gray-500">
                Posted by: {props.buyerId.name}
              </p>
            )}
          </div>
          {/* <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">
            {props.status}
          </span> */}
        </div>

        {/* Card Body */}
        <div className="space-y-3 text-gray-700">
          <div className="flex justify-between">
            <span className="font-semibold">Quantity:</span>
            <span>{props.quantity}</span>
          </div>
          {/* {expected price} */}
          <div className="flex justify-between">
            <span className="font-semibold">Expected Price:</span>
            <span>{props.expectedPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Needed By:</span>
            {/* <span>{new Date(props.neededBy).toLocaleDateString()}</span> */}
            <span>{new Date(props.neededBy).toDateString()  }</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Location:</span>
            <span>{props.location}</span>
          </div>
          {props.description && (
            <p className="text-md pt-2">
              <strong className="font-semibold">Terms:</strong>{" "}
              {props.description}
            </p>
          )}
        </div>
      </div>

      {/* Card Footer / Actions */}
      <div className="flex justify-end space-x-2 mt-6">
        {role === "Buyer" && (
          <>
            <Button onClick={() => setUpdateModalOpen(true)}>Update</Button>
            <Button onClick={handleDelete} variant="danger">
              Delete
            </Button>
          </>
        )}
        {renderRequestButton()}
      </div>

      {/* className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-40 flex justify-center items-center p-4" */}
      {/* The Update Modal */}
      {isUpdateModalOpen && (
        <div className="mt-8 fixed inset-0 bg-opacity-50 backdrop-blur-sm z-40 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl z-50 w-full max-w-lg relative">
            <button
              onClick={() => setUpdateModalOpen(false)}
              className="absolute top-2 right-2 text-4xl text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
            <UpdateRequirement
              {...props}
              closeModal={() => setUpdateModalOpen(false)}
              onUpdateSuccess={props.onUpdateSuccess}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Requirement;
