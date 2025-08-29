import { use, useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const UpdateOffer = (props) => {
  const { register, handleSubmit } = useForm();
  const { setUser } = useContext(AppContext);
  const onSubmit = (data) => {
    const UpdateOffer = async () => {
      try {
        const response = await fetch(`${BASE_URL}/offers/${props.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
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
          toast.success("Offer updated successfully");
          window.location.reload();
        } else {
          toast.error(result.message || "Failed to update offer");
        }
      } catch (error) {
        console.log("msg:", error.message);
        toast.error("An error occurred while updating the offer");
      }
    };
    UpdateOffer();
  };

  return (
    <div>
      <h3>Update Offer</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Crop:
          <input
            type="text"
            name="crop"
            {...register("crop")}
            defaultValue={props.crop}
          />
        </label>
        <label>
          Quantity:
          <input
            type="text"
            name="quantity"
            {...register("quantity")}
            defaultValue={props.quantity}
          />
        </label>
        <label>
          Expected Price:
          <input
            type="text"
            name="expectedPrice"
            {...register("expectedPrice")}
            defaultValue={props.expectedPrice}
          />
        </label>
        <label>
          Expected Duration:
          <input
            type="text"
            name="expectedDuration"
            {...register("expectedDuration")}
            defaultValue={props.expectedDuration}
          />
        </label>
        <button type="submit">Update Offer</button>
      </form>
    </div>
  );
};

export default UpdateOffer;
