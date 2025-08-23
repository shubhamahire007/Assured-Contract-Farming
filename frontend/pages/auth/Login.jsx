import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login = () => {
  const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const {setLogin} = useContext(AppContext);
  const submitHandler = async (data) => {
    try {
        const res = await fetch(`${BASE_URL}/login`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data) // converted from js object to JSON
        });

        const result = await res.json(); // converted json response to JS object

        if (result.success) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("email", result.userObj.email);
        localStorage.setItem("name", result.userObj.name);
        localStorage.setItem("role", result.userObj.role);
        localStorage.setItem("id", result.userObj._id);
        // console.log("id: ", result.userObj._id);
        if(result.userObj.role == "Admin"){
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
        setLogin(true);
        toast.success("Login successfully");
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (error) {
        console.error("Error:", error);
        toast.error(error.message || "An error occurred");
    }
  } 

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(submitHandler)}>
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <br /> <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
