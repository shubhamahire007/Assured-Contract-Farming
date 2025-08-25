import UpdateRequirement from "./UpdateRequirement";
import { useState } from "react";
const Requirement = (props) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const role = localStorage.getItem("role") || "";
  const handleDelete = () => {
    // Call the delete function passed from the parent component
    confirm("Are you sure you want to delete this requirement?") &&
      props.onDelete(props.id);
  };

  const handleUpdate = () => {
    setShowUpdate(true);
  };

  return (
    <div>
      <li>
        <span>Crop: {props.crop}</span> -{" "}
        <span>Quantity: {props.quantity}</span> -{" "}
        <span>Expected Price: {props.expectedPrice}</span> -{" "}
        <span>Needed By: {props.neededBy.split("T")[0]}</span>
      </li>
      {role === "Buyer" && (
        <>
          <button onClick={handleUpdate}>Update</button> {"  "}
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
      {role == "Farmer" && <button>Send Request</button>}
      {showUpdate && <UpdateRequirement {...props} />}
    </div>
  );
};

export default Requirement;
