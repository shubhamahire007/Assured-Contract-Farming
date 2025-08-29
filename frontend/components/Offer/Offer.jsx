import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import UpdateOffer from "./UpdateOffer";
import toast from "react-hot-toast";
import Button from "../common/Button";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Offer = (props) => {
  const { user,role } = useContext(AppContext);
  const [showUpdate, setShowUpdate] = useState(false);
  const [requestStatus, setRequestStatus] = useState(props.requestStatus);
  const handleDelete = () => {
    confirm("Are you sure you want to delete this offer?") &&
      props.onDelete(props.id);
  };
  const handleUpdate = () => {
    setShowUpdate(true);
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
        body: JSON.stringify({ offerId: props.id }),
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
    }
  };
  // --- ADD THIS HELPER FUNCTION ---
  const renderRequestButton = () => {
    if (user.role !== "Buyer") return null;

    switch (requestStatus) {
      case "Pending":
        return <button disabled>Request Sent</button>;
      case "Accepted":
        return <button disabled style={{ backgroundColor: 'lightgreen' }}>Accepted</button>;
      case "Rejected":
        return <button disabled style={{ backgroundColor: 'salmon' }}>Rejected</button>;
      default:
        return <button onClick={handleSendRequest}>Apply for Contract</button>;
    }
  };

  return (
    <div>
      <li>
        {role !== "Farmer" && <span>Farmer Name: {props.farmerId.name}</span>}
        {" "}<span>Crop: {props.crop}</span> -{" "}
        <span>Quantity: {props.quantity}</span> -{" "}
        <span>Expected Price: {props.expectedPrice}</span> -{" "}
        <span>Expected Duration: {props.expectedDuration}</span>
      </li>
      {user.role === "Farmer" && (
        <>
          <Button onClick={handleUpdate}>Update</Button> {"  "}
          <Button onClick={handleDelete} variant="danger">Delete</Button>
        </>
      )}
      {renderRequestButton()}
      {showUpdate && <UpdateOffer {...props} />}
    </div>
  );
};

export default Offer;
