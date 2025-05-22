// // src/components/ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("authToken");
//   return token ? children : <Navigate to="/auth" replace />;
// };

// export default ProtectedRoute;

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return currentUser ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;