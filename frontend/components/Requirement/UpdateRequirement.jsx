import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const UpdateRequirement = (props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const updateRequirement = async () => {
      try {
        const response = await fetch(`${BASE_URL}/requirements/${props.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.success) {
          toast.success("Requirement updated successfully");
          window.location.reload();
        } else {
          toast.error(result.message || "Failed to update requirement");
        }
      } catch (error) {
        toast.error("An error occurred while updating the requirement");
      }
    };

    updateRequirement();
  };

  return (
    <div>
      <h2>Update Requirement</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Crop:
          <input type="text" {...register("crop")} defaultValue={props.crop} />
        </label>
        <label>
          Quantity:
          <input
            type="text"
            {...register("quantity")}
            defaultValue={props.quantity}
          />
        </label>
        <label>
          Expected Price:
          <input
            type="text"
            {...register("expectedPrice")}
            defaultValue={props.expectedPrice}
          />
        </label>
        <label>
          Needed By:
          <input
            type="date"
            {...register("neededBy")}
            defaultValue={props.neededBy.split("T")[0]}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateRequirement;
