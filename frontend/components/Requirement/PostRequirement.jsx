import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const PostRequirement = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${BASE_URL}/requirements`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result.success) {
        toast.success("Requirement posted successfully");
        window.location.reload(); // Refresh the current page
      } else {
        console.log("Failed to post requirement:", result);
        console.log("result msg:", result.message);
        toast.error(result.message || "Failed to post requirement");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to post requirement");
    }
    console.log(data);
  };

  return (
    <div>
      <h2>Post Requirement</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Crop:
          <input type="text" {...register("crop")} />
        </label>
        <br />
        <label>
          Quantity:
          <input type="text" {...register("quantity")} />
        </label>
        <br />
        <label>
          Expected Price:
          <input type="text" {...register("expectedPrice")} />
        </label>
        <br />
        <label>
          Needed By:
          <input type="date" {...register("neededBy")} />
        </label>
        <br /> <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostRequirement;