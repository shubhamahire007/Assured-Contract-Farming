import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Button from "../../components/common/Button";
import CircularProgress from "@mui/material/CircularProgress";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { setUser, user, isLoading, setLoading } = useContext(AppContext);

  const submitHandler = async (data) => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result.success) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("email", result.userObj.email);
        localStorage.setItem("name", result.userObj.name);
        localStorage.setItem("role", result.userObj.role);
        localStorage.setItem("id", result.userObj._id);

        const standardizedUser = {
          id: result.userObj._id,
          name: result.userObj.name,
          email: result.userObj.email,
          role: result.userObj.role,
          isVerified: result.userObj.isVerified || false,
        };
        setUser(standardizedUser);

        toast.success("Login successful");
        if (result.userObj.role === "Admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Login to your Account
        </h1>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: true })}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password", { required: true })}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-green-600 hover:text-green-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
