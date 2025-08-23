import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Navigation from '../components/Navigation'
import FarmerDashboard from '../pages/dashboard/FarmerDashboard';
import BuyerDashboard from '../pages/dashboard/Buyer/BuyerDashboard';
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Home from '../pages/Home';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path="/*" element={<Navigate to="/" replace />}></Route>
        <Route
          path='/farmer-dashboard'
          element={
            <ProtectedRoute role="Farmer">
              <FarmerDashboard/>
            </ProtectedRoute>
          }
        />
        <Route
          path='/buyer-dashboard'
          element={
            <ProtectedRoute role="Buyer">
              <BuyerDashboard/>
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin-dashboard'
          element={
            <ProtectedRoute role="Admin">
              <AdminDashboard/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
