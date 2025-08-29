import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'; 
import AppContextProvider from '../context/AppContext.jsx';
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <AppContextProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </AppContextProvider>
  // </React.StrictMode>,
)
