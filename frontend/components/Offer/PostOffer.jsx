import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const PostOffer = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { setUser, setLoading } = useContext(AppContext);

  const onSubmit = async (data) => {
    setLoading(true);
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
        reset(); // Clear form fields
        // Consider redirecting or updating state instead of reloading
      } else {
        toast.error(result.message || "Failed to post offer");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while posting the offer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-0 max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 mt-0">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Create a New Offer
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-md font-medium text-gray-700">
              Crop
            </label>
            <input
              type="text"
              {...register("crop", { required: true })}
              placeholder="e.g. Wheat"
              className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="flex gap-4 justify-between">
            <div>
              <label className="block text-md font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="text"
                {...register("quantity", { required: true })}
                placeholder="e.g. 100 Quintal / 2 Ton"
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-md font-medium text-gray-700">
                Expected Price
              </label>
              <input
                type="text"
                {...register("expectedPrice", { required: true })}
                placeholder="e.g. 1000 per Quintal"
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          <div className="flex gap-6 justify-between">
            <div className="w-1/3">
              <label className="block text-md font-medium text-gray-700">
                Expected Duration
              </label>
              <input
                type="text"
                {...register("expectedDuration", { required: true })}
                placeholder="e.g. 3 Months"
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="w-2/3">
              <label className="block text-md font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                {...register("location", { required: true })}
                placeholder="e.g. Nashik, Maharashtra"
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-md font-medium text-gray-700">
              Additional Information
            </label>
            <textarea
              {...register("description")}
              rows="3"
              placeholder="e.g. Organic farming practices used"
              className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
            ></textarea>
          </div>
          <div className="pt-2">
            <Button type="submit">Submit Offer</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostOffer;
