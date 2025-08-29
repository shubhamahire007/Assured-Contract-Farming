import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const PostOffer = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${BASE_URL}/offers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
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
        toast.success("Offer posted successfully");
        window.location.reload(); // Refresh the current page
      } else {
        console.log("Failed to post offer:", result);
        console.log("result msg:", result.message);
        toast.error(result.message || "Failed to post offer");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to post offer");
    }
  };

  return (
    <div>
      <h2>Post Offer</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Crop:
          <input type="text" {...register("crop")} placeholder="e.g. Wheat" />
        </label>
        <br />
        <label>
          Quantity:
          <input
            type="text"
            {...register("quantity")}
            placeholder="e.g. 100 Quintol / 2 Ton"
          />
        </label>
        <br />
        <label>
          Expected Price:
          <input
            type="text"
            {...register("expectedPrice")}
            placeholder="e.g. 1000 per Quintol"
          />
        </label>
        <br />
        <label>
          {" "}
          Expected Duration:
          <input
            type="text"
            {...register("expectedDuration")}
            placeholder="e.g. 3 Month"
          />
        </label>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostOffer;
