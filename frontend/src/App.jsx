import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "../components/Navigation";
import FarmerDashboard from "../pages/dashboard/FarmerDashboard";
import BuyerDashboard from "../pages/dashboard/BuyerDashboard";
import AdminDashboard from "../pages/dashboard/Admin/AdminDashboard";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Home from "../pages/Home";
import { Navigate, Link } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import RequirementsList from "../components/Requirement/RequirementsList";
import OffersList from "../components/Offer/OffersList";
import CreateContract from "../components/Contract/CreateContract";
import Footer from "../components/Footer";
import ContractDetails from "../components/Contract/ContractDetails";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/*" element={<Navigate to="/" replace />}></Route>
          <Route
            path="/create-contract/:requestId"
            element={<CreateContract />}
          ></Route>
          <Route
            path="/contract/:contractId"
            element={<ContractDetails />}
          ></Route>
          <Route
            path="/view-requirements"
            element={
              <ProtectedRoute role="Farmer">
                <div className="max-w-7xl mx-auto p-4">
                  <h1 className="text-2xl font-bold mb-4">
                    All Buyer Requirements
                  </h1>
                  <p className="mt-4 text-lg text-gray-600 mb-6">
                    Browse Requirements from Buyers and send a request to form a
                    contract.
                  </p>
                  <RequirementsList />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-offers"
            element={
              <ProtectedRoute role="Buyer">
                <div className="max-w-7xl mx-auto p-4">
                  <h1 className="text-2xl font-bold mb-4">All Farmer Offers</h1>
                  <p className="mt-4 text-lg text-gray-600 mb-4">
                    Browse offers from Farmers and send a request to form a
                    contract.
                  </p>
                  <OffersList />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/farmer-dashboard"
            element={
              <ProtectedRoute role="Farmer">
                <FarmerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/buyer-dashboard"
            element={
              <ProtectedRoute role="Buyer">
                <BuyerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="Admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
