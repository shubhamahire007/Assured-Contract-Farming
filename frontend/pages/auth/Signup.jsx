import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/common/Button";

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
        toast.success("Signup successful! Please log in.");
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8  space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Create a New Account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-md font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: true })}
              placeholder="John Doe"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-md font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
              placeholder="you@example.com"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-md font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: true })}
              placeholder="••••••••"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-md font-medium text-gray-700"
            >
              I am a...
            </label>
            <select
              id="role"
              {...register("role", { required: true })}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select Role</option>
              <option value="Farmer">Farmer</option>
              <option value="Buyer">Buyer</option>
            </select>
          </div>
          <div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
        </form>
        <p className="text-md text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-green-600 hover:text-green-500"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;