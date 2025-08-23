import { useState,useEffect } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const RequirementsList = () => {
    const buyerId = localStorage.getItem("id") || "";
    const token = localStorage.getItem("token") || "";

    const [requirements, setRequirements] = useState([]);
   
    useEffect(() => {
        const fetchRequirements = async () => {
            const response = await fetch(`${BASE_URL}/requirements/buyer/${buyerId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const result = await response.json();
            if(result.success){
                setRequirements(result.data);
            } else {
                setRequirements([]);
            }
        };
        fetchRequirements();
    }, []);
    return(
        <>
            <h2>My Requirements</h2>
            {requirements.length === 0 ? (
                <p>No requirements found.</p>
            ) : (
                <ul>
                    {requirements.map(req => (
                        <li key={req._id}>{req.crop} - {req.quantity} - {req.expectedPrice}</li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default RequirementsList;