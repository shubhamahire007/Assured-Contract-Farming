import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import CircularProgress from "@mui/material/CircularProgress";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const UsersList = ({ role }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const endpoint =
      role === "Farmer" ? `${BASE_URL}/farmers` : `${BASE_URL}/buyers`;
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
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
          setUsers(result.data);
        } else {
          setUsers([]);
        }
      } catch (error) {
        toast.error("Error while fetching Users");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [role, navigate, setUser]);

  const handleVerify = async (id) => {
    toast.info("Verification feature coming soon!");
    // try {
    //   const response = await fetch(`${BASE_URL}/verify/${id}`, {
    //     method: "PUT",
    //     headers: {
    //        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    //     }
    //   });
    //   if(response.ok) {
    //     toast.success("User verified successfully");
    //     setUsers(users.map(user => user._id === id ? {...user, isVerified: true} : user));
    //   } else {
    //     toast.error("Error while verifying user");
    //   }
    // } catch(error) {
    //    toast.error("Error while verifying user");
    // }
  }

  const handleDelete = (id) => {
    const deleteUser = async () => {
      if (!confirm("Are you sure you want to delete this user?")) return;

      try {
        const response = await fetch(`${BASE_URL}/users/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });

        if (response.ok) {
          toast.success("User deleted successfully");
          setUsers(users.filter((user) => user._id !== id));
        } else {
          toast.error("Error while deleting user");
        }
      } catch (error) {
        toast.error("Error while deleting user");
      }
    };
    deleteUser();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage {role}s</h2>
      {users.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-medium">No {role}s found.</h3>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {user.isVerified ? (
                       <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Verified
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        Not Verified
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    {!user.isVerified && (
                      <Button onClick={() => handleVerify(user._id)}>Verify</Button>
                    )}
                    <Button onClick={() => handleDelete(user._id)} variant="danger">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersList;
