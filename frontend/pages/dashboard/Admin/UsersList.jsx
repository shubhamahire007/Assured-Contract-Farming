import { useContext, useEffect, useState } from "react";
import { set } from "react-hook-form";
import toast from "react-hot-toast";
import { AppContext } from "../../../context/AppContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const UsersList = ({ role }) => {
  const [users, setUsers] = useState([]);
  const {setUser} = useContext(AppContext)
  useEffect(() => {
    const endpoint =
      role === "Farmer" ? `${BASE_URL}/farmers` : `${BASE_URL}/buyers`;
    const fetchUsers = async () => {
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
        console.log("Error while fetching Users");
      }
    };
    fetchUsers();
  }, [role]);

  const handleDelete = (id) => {
    const deleteUser = async () => {
      if (!confirm("Are you sure you want to delete this user?")) return;

      try {
        const response = await fetch(`${BASE_URL}/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
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
  return (
    <>
      <h2>{role}s List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name}{" "}
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UsersList;
