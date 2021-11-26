import React from "react";
import { useLocation, Navigate } from 'react-router-dom';
import { useAuthState } from "../../context";

const RequireAuth = ({ children }) => {
    const auth = useAuthState();
    const location = useLocation();
  
    if (!auth.token || !auth.user) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
  
    return children;
  }
  
export default RequireAuth;