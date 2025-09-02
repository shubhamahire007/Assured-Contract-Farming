import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const UpdateOffer = ({ closeModal, ...props }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      ...props,
    },
  });

  const { setUser, setOffers } = useContext(AppContext);
  const navigate = useNavigate();
  const handleUpdateSuccess = (updatedOffer) => {
    setOffers((prevOffers) =>
      prevOffers.map((offer) =>
        offer._id === updatedOffer._id ? updatedOffer : offer
      )
    );
    toast.success("Offer updated successfully");
    closeModal();
  };

  const onSubmit = (data) => {
    const updateOffer = async () => {
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
          // toast.success("Offer updated successfully");
          // window.location.reload();
          handleUpdateSuccess(result.data);
        } else {
          toast.error(result.message || "Failed to update offer");
        }
      } catch (error) {
        toast.error("An error occurred while updating the offer");
      }
    };
    updateOffer();
  };

  return (
    // max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Update Offer</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-md font-semibold text-gray-700">
            Crop:
          </label>
          <input
            type="text"
            {...register("crop")}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="flex justify-between">
          <div>
            <label className="block text-md font-semibold text-gray-700">
              Quantity:
            </label>
            <input
              type="text"
              {...register("quantity")}
              className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label className="block text-md font-medium text-gray-700">
              Expected Price:
            </label>
            <input
              type="text"
              {...register("expectedPrice")}
              className=" p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-md font-medium text-gray-700">
            Expected Duration:
          </label>
          <input
            type="text"
            {...register("expectedDuration")}
            defaultValue={props.expectedDuration}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label className="block text-md font-medium text-gray-700">
            Location:
          </label>
          <input
            type="text"
            {...register("location")}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label className="block text-md font-medium text-gray-700">
            Additional Information:
          </label>
          <textarea
            {...register("description")}
            rows="2"
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOffer;
