import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'; 
import AppContextProvider from '../context/AppContext.jsx';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <AppContextProvider>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </AppContextProvider>
  // </React.StrictMode>,
)
