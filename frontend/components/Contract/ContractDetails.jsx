import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import {toast} from 'react-toastify';
import Button from '../common/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TermsAndConditions from './TermsAndConditions';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ContractDetails = () => {
    const { contractId } = useParams();
    const navigate = useNavigate();
    const { user, isLoading, setLoading } = useContext(AppContext);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const fetchContract = async (req,res) => {
            try {
                const response = await fetch(`${BASE_URL}/contracts/${contractId}`, {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const result = await response.json();
                if(result.success){
                    setContract(result.data);
                } else {
                    toast.error(result.message || "Failed to fetch contract details.");
                    navigate(-1);
                }
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false);
            }
        }
        if (contractId) {
            fetchContract();
        }
    }, [contractId, navigate, setLoading,contract]);

    const handleConfirm = async (req,res) => {
        if (!window.confirm("Are you sure you want to confirm this contract? This action cannot be undone.")) return;
        try {
            const response = await fetch(`${BASE_URL}/contracts/${contract._id}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            const result = await response.json();
            if (result.success) {
                toast.success(result.message || 'Contract confirmed successfully.');
                setContract(result.data);
            } else {
                toast.error(result.message || 'Failed to confirm contract.');
            }
        } catch (error) {
            toast.error('An error occurred during confirmation.');
        }
    }

    if (isLoading || !contract) {
        return <div className="flex justify-center items-center h-screen"><CircularProgress /></div>;
    }

    const isPendingConfirmation = contract.status === 'Pending' &&
                                  ((user.role === 'Farmer' && !contract.confirmation.farmerConfirmed) ||
                                   (user.role === 'Buyer' && !contract.confirmation.buyerConfirmed));

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
            <h1 className="text-3xl font-bold text-center mb-6">Contract Details</h1>
            <div className="bg-white p-8 rounded-lg shadow-md">
                {/* Header with Status */}
                <div className="flex justify-between items-center border-b pb-4 mb-6">
                    <h2 className="text-xl font-bold">Contract for {contract.crop}</h2>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        contract.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                        {contract.status}
                    </span>
                </div>

                {/* Party Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <h3 className="font-semibold text-lg">Farmer</h3>
                        <p>{contract.farmerId.name}</p>
                        <p className="text-sm text-gray-500">{contract.farmerId.email}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Buyer</h3>
                        <p>{contract.buyerId.name}</p>
                        <p className="text-sm text-gray-500">{contract.buyerId.email}</p>
                    </div>
                </div>

                {/* Terms */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-t pt-4">Terms</h3>
                    <p><strong>Crop:</strong> {contract.crop}</p>
                    <p><strong>Quantity:</strong> {contract.quantity}</p>
                    <p><strong>Price:</strong> {contract.pricePerUnit}</p>
                    <p><strong>Completion Date:</strong> {new Date(contract.endDate).toLocaleDateString()}</p>
                </div>
                
                <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-2">Platform Terms & Conditions</h3>
                    <TermsAndConditions />
                </div>

                {/* Action Button */}
                {isPendingConfirmation && (
                    <div className="text-center mt-8 pt-6 border-t">
                        <p className="mb-4">By clicking confirm, you agree to all terms outlined in this contract.</p>
                        <Button onClick={handleConfirm} variant="primary">
                            Confirm Contract
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ContractDetails;