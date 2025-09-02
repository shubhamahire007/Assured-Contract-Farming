import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";
import Button from "../common/Button";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const UpdateRequirement = ({ closeModal, onUpdateSuccess, ...props }) => {
  const { register, handleSubmit } = useForm();
  const { setUser } = useContext(AppContext);

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
        if (response.status === 401) {
          localStorage.clear();
          setUser(null);
          toast.error("Your session has expired.");
          navigate("/login");
          return;
        }
        const result = await response.json();
        if (result.success) {
          toast.success("Requirement updated successfully");
          onUpdateSuccess(result.data);
          closeModal();
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
      <h2 className="text-2xl font-bold mb-4">Update Requirement</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Form fields remain the same */}
        <div>
          <label className="block text-md font-medium text-gray-700">
            Crop:
          </label>
          <input
            type="text"
            {...register("crop")}
            defaultValue={props.crop}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        {/* <div>
          <label className="block text-md font-medium text-gray-700">
            Quantity:
          </label>
          <input
            type="text"
            {...register("quantity")}
            defaultValue={props.quantity}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div> */}
        <div className="flex justify-between">
          <div>
            <label className="block text-md font-semibold text-gray-700">
              Quantity:
            </label>
            <input
              type="text"
              {...register("quantity")}
              defaultValue={props.quantity}
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
              defaultValue={props.expectedPrice}
              className=" p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-md font-medium text-gray-700">
            Needed By:
          </label>
          <input
            type="date"
            {...register("neededBy")}
            defaultValue={props.neededBy.split("T")[0]}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-md font-medium text-gray-700">
            Location:
          </label>
          <input
            type="text"
            {...register("location")}
            defaultValue={props.location}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-md font-medium text-gray-700">
            Additional Information:
          </label>
          <textarea
            {...register("description")}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            {props.description}
          </textarea>
        </div>

        {/* Form action buttons */}
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

export default UpdateRequirement;
