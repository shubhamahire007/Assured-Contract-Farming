import { useNavigate, Link, NavLink as RouterNavLink } from "react-router-dom";
import { useContext,useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import Button from "./common/Button";
import Logo from '../src/assets/logo_final.png'

const NavLink = ({ to, children }) => (
  <RouterNavLink to={to} className="text-gray-700  hover:text-green-700  px-3 py-2 rounded-md text-base font-medium [&.active]:text-green-800">
    {children}
  </RouterNavLink>
);

const Navigation = () => {
  const navigate = useNavigate();
  const { isLogin, setLogin, setRole, setUser, name, role, user } = useContext(AppContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    toast.success("Logout successful");
    navigate("/");
  };
  
  return (
      <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo and Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img className="h-13 w-auto" src={Logo} alt="AgriSure Logo" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLink to="/">Home</NavLink>
            {isLogin && role === "Farmer" && <NavLink to="/view-requirements">View Requirements</NavLink>}
            {isLogin && role === "Buyer" && <NavLink to="/view-offers">View Offers</NavLink>}
            {isLogin && <NavLink to={`/${role.toLowerCase()}-dashboard`}>Dashboard</NavLink>}
          </div>

          {/* User Info and Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLogin ? (
              <>
                <span className="text-base font-medium text-gray-500">Welcome, {user.name}</span>
                <Button onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Button to="/login">Login</Button>
                <Button to="/signup">Sign Up</Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/">Home</NavLink>
            {isLogin && role === "Farmer" && <NavLink to="/view-requirements">View Requirements</NavLink>}
            {isLogin && role === "Buyer" && <NavLink to="/view-offers">View Offers</NavLink>}
            {isLogin && <NavLink to={`/${role.toLowerCase()}-dashboard`}>Dashboard</NavLink>}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isLogin ? (
              <div className="px-5">
                <p className="text-sm text-gray-500">Welcome, {user.name}</p>
                <button onClick={handleLogout} className=" text-left mt-2 bg-red-100 text-red-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-red-200">
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-2 space-y-2">
                <Link to="/login" className="block bg-green-600 text-white text-center px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">Login</Link>
                <Link to="/signup" className="block bg-green-600 text-white text-center px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
