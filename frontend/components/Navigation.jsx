import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import {toast} from "react-hot-toast";

const Navigation = () => {
  const navigate = useNavigate();
  const { isLogin, setLogin } = useContext(AppContext);
  const role = localStorage.getItem("role") || "";
  const userName = localStorage.getItem("name") || "";
  
  return (
    <div>
      <nav>
        <button onClick={(e) => navigate("/")}>Home</button>

        {isLogin && role === "Farmer" && (
          <button onClick={(e) => navigate("/farmer-dashboard")}>Dashboard</button>
        )}
        {isLogin && role === "Buyer" && (
          <button onClick={(e) => navigate("/buyer-dashboard")}>Dashboard</button>
        )}
        {isLogin && role === "Admin" && (
          <button onClick={(e) => navigate("/admin-dashboard")}>Dashboard</button>
        )}

        {isLogin && (
          <button
            onClick={(e) => {
              setLogin(false);
              localStorage.clear();
              navigate("/");
              toast.success("Logout successful");
            }}
          >
            Logout
          </button>
        )}

        {!isLogin && (
          <button onClick={(e) => navigate("/signup")}>Signup</button>
        )}
        {!isLogin && <button onClick={(e) => navigate("/login")}>Login</button>}
        &nbsp; &nbsp;
        <span>{isLogin && `Welcome, ${userName}`}</span>
        &nbsp; &nbsp;
        <span>{role && `Role: ${role}`}</span>
      </nav>
    </div>
  );
};

export default Navigation;
