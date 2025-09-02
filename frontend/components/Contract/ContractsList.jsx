import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import Button from "../common/Button";
import CircularProgress from "@mui/material/CircularProgress";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ContractItem = ({ contract, user }) => {
  const navigate = useNavigate();
  const isPendingConfirmation =
    contract.status === "Pending" &&
    ((user.role === "Farmer" && !contract.confirmation.farmerConfirmed) ||
      (user.role === "Buyer" && !contract.confirmation.buyerConfirmed));

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">{contract.crop}</h3>
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            contract.status === "Active"
              ? "bg-green-100 text-green-800"
              : contract.status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {contract.status}
        </span>
      </div>
      <p className="text-sm text-gray-600">
        With:{" "}
        {user.role === "Farmer"
          ? contract.buyerId.name
          : contract.farmerId.name}
      </p>
      <div className=" flex justify-end">
        {isPendingConfirmation ? (
          <Button onClick={() => navigate(`/contract/${contract._id}`)}>
            View & Confirm
          </Button>
        ) : (
          <Button
            onClick={() => navigate(`/contract/${contract._id}`)}
          >
            View Details
          </Button>
        )}
      </div>
    </div>
  );
};

const ContractsList = () => {
  const [contracts, setContracts] = useState([]);
  const { user, isLoading, setLoading } = useContext(AppContext);

  useEffect(() => {
    const fetchContracts = async () => {
      if (!user) return;
      setLoading(true);
      let URL = user.role === "Admin" ? `${BASE_URL}/contracts` : `${BASE_URL}/contracts/user/${user.id}`;
      try {
        const response = await fetch(URL, {
            method:"GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await response.json();
        if (result.success) {
          setContracts(result.data);
        } else {
          toast.error(result.message || "Failed to fetch contracts.");
        }
      } catch (error) {
        toast.error("An error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchContracts();
  }, [user, setLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-4">
      {contracts.length === 0 ? (
        <p>You have no contracts yet.</p>
      ) : (
        contracts.map((contract) => (
          <ContractItem key={contract._id} contract={contract} user={user} />
        ))
      )}
    </div>
  );
};

export default ContractsList;
