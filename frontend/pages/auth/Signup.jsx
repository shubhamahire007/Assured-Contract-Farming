import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navigation from "../../components/Navigation";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Signup successful");
        navigate("/login");
      } else {
        toast.error(result.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <div>
      <h1>Signup</h1>

      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          type="text"
          {...register("name")}
          placeholder="Name"
          required
        />
        <br />
        <input
          type="email"
          {...register("email")}
          placeholder="Email"
          required
        />
        <br />
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          required
        />
        <br />
        <select {...register("role")} required>
          <option value="">Select Role</option>
          <option value="Farmer">Farmer</option>
          <option value="Buyer">Buyer</option>
        </select>
        <br /> <br />
        <button>Signup</button>
      </form>
    </div>
  );
};

export default Signup;
