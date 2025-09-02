import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import Button from "../common/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TermsAndConditions from "./TermsAndConditions";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const CreateContract = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { user, isLoading, setLoading } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [contractData, setContractData] = useState(null);

  useEffect(() => {
    const fetchContractData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}/contracts/data-for-creation/${requestId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const result = await response.json();
        if (result.success) {
          const date = result.data.item.neededBy
            ? result.data.item.neededBy
            : "";
          console.log("date ", date);
          setContractData(result.data);
          setValue("crop", result.data.item.crop);
          setValue("quantity", result.data.item.quantity);
          setValue("pricePerUnit", result.data.item.expectedPrice);
          setValue("endDate", date);
          console.log("date: ", date);
        } else {
          toast.error(result.message);
          navigate(-1);
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchContractData();
  }, [requestId, user.token, setLoading]);

  const onSubmit = async (formData) => {
    const submissionData = {
      ...formData,
      requestId: contractData.request._id,
      farmerId:
        contractData.request.senderId.role === "Farmer"
          ? contractData.request.senderId._id
          : contractData.request.receiverId._id,
      buyerId:
        contractData.request.senderId.role === "Buyer"
          ? contractData.request.senderId._id
          : contractData.request.receiverId._id,
      offerId: contractData.request.offerId,
      requirementId: contractData.request.requirementId,
    };

    try {
      const response = await fetch(`${BASE_URL}/contracts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(submissionData),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        // navigate(`/${user.role.toLowerCase()}-dashboard`); // Navigate to dashboard on success
        navigate(-1);
      } else {
        toast.error(result.message || "Failed to create contract.");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred while creating the contract.");
    }
  };

  if (isLoading || !contractData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  const { request, item } = contractData;
  const farmer =
    request.senderId.role === "Farmer" ? request.senderId : request.receiverId;
  const buyer =
    request.senderId.role === "Buyer" ? request.senderId : request.receiverId;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-6">Create Contract</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-8 rounded-lg shadow-md"
      >
        {/* Party Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-6">
          <div>
            <h3 className="font-bold text-lg">Farmer Details</h3>
            <p>{farmer.name}</p>
            <p className="text-sm text-gray-500">{farmer.email}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg">Buyer Details</h3>
            <p>{buyer.name}</p>
            <p className="text-sm text-gray-500">{buyer.email}</p>
          </div>
        </div>

        {/* Contract Terms */}
        <div>
          <h3 className="font-bold text-lg mb-4">Contract Terms</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-md font-medium">Crop</label>
              <input
                {...register("crop", { required: true })}
                readOnly
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 p-2"
              />
            </div>
            <div className="flex justify-between">
              <div>
                <label className="block text-md font-medium">
                  Agreed Quantity
                </label>
                <input
                  {...register("quantity", { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-md font-medium">
                  Final Price (per unit)
                </label>
                <input
                  {...register("pricePerUnit", { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
            <div>
              <label className="block text-md font-medium">
                Completion Date
              </label>
              <input
                type="date"
                {...register("endDate", { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              />
            </div>
            </div>
            {/* <div>
              <label className="block text-md font-medium">
                Terms & Conditions
              </label>
              <textarea
                {...register("terms")}
                rows="3"
                placeholder="Any additional terms or conditions..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              ></textarea>
            </div> */}
            <div>
              <label className="block text-md font-medium mb-2">
                Platform Terms & Conditions
              </label>
              <TermsAndConditions />
              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  id="termsAcceptance"
                  {...register("termsAccepted", {
                    required: "You must accept the terms and conditions",
                  })}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label
                  htmlFor="termsAcceptance"
                  className="ml-2 block text-sm text-gray-900"
                >
                  I have read and agree to the terms and conditions.
                </label>
              </div>
              {errors.termsAccepted && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.termsAccepted.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="text-right pt-4 flex justify-center">
          <Button>Create and Send for Confirmation</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateContract;
