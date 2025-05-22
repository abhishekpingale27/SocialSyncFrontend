// // // // src/context/AuthContext.jsx
// // // import { createContext, useContext, useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { useNavigate } from 'react-router-dom';

// // // const AuthContext = createContext();

// // // export function AuthProvider({ children }) {
// // //   const [currentUser, setCurrentUser] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const navigate = useNavigate();

// // //   const login = async (email, password) => {
// // //     try {
// // //       const response = await axios.post('/api/auth/login', { email, password });
// // //       localStorage.setItem('token', response.data.token);
// // //       setCurrentUser(response.data.user);
// // //       navigate('/dashboard');
// // //     } catch (error) {
// // //       throw error;
// // //     }
// // //   };

// // //   const logout = () => {
// // //     localStorage.removeItem('token');
// // //     setCurrentUser(null);
// // //     navigate('/login');
// // //   };

// // //   useEffect(() => {
// // //     const verifyToken = async () => {
// // //       const token = localStorage.getItem('token');
// // //       if (!token) {
// // //         setLoading(false);
// // //         return;
// // //       }

// // //       try {
// // //         const response = await axios.get('/api/auth/me', {
// // //           headers: { Authorization: `Bearer ${token}` }
// // //         });
// // //         setCurrentUser(response.data);
// // //       } catch (error) {
// // //         localStorage.removeItem('token');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     verifyToken();
// // //   }, []);

// // //   return (
// // //     <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
// // //       {!loading && children}
// // //     </AuthContext.Provider>
// // //   );
// // // }

// // // export function useAuth() {
// // //   return useContext(AuthContext);
// // // }

// // import { createContext, useContext, useState, useEffect } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // const AuthContext = createContext();

// // export function AuthProvider({ children }) {
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();

// //   const login = async (email, password) => {
// //     try {
// //       const response = await axios.post("/api/auth/login", { email, password });
// //       localStorage.setItem("token", response.data.token);
// //       setCurrentUser(response.data.user);
// //       navigate("/dashboard");
// //     } catch (error) {
// //       throw error;
// //     }
// //   };

// //   const logout = () => {
// //     localStorage.removeItem("token");
// //     setCurrentUser(null);
// //     navigate("/auth");
// //   };

// //   useEffect(() => {
// //     const verifyToken = async () => {
// //       const token = localStorage.getItem("token");
// //       if (!token) {
// //         setLoading(false);
// //         return;
// //       }

// //       try {
// //         const response = await axios.get("/api/auth/me", {
// //           headers: { Authorization: `Bearer ${token}` }
// //         });
// //         setCurrentUser(response.data);
// //       } catch (error) {
// //         localStorage.removeItem("token");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     verifyToken();
// //   }, []);

// //   return (
// //     <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
// //       {!loading && children}
// //     </AuthContext.Provider>
// //   );
// // }

// // export function useAuth() {
// //   return useContext(AuthContext);
// // }
// // src/context/AuthContext.jsx
// import { createContext, useContext, useState, useEffect, useMemo } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// // Custom provider component
// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post("/api/auth/login", { email, password });
//       localStorage.setItem("token", response.data.token);
//       setCurrentUser(response.data.user);
//       navigate("/dashboard");
//     } catch (error) {
//       throw error;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setCurrentUser(null);
//     navigate("/auth");
//   };

//   useEffect(() => {
//     const verifyToken = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get("/api/auth/me", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setCurrentUser(response.data);
//       } catch (error) {
//         localStorage.removeItem("token");
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifyToken();
//   }, []);

//   const value = useMemo(() => ({
//     currentUser,
//     login,
//     logout,
//     loading
//   }), [currentUser, loading]);

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// // Named export for the hook
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await apiClient.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      setCurrentUser(response.data.user);
      navigate("/dashboard");
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/auth");
  };

  const refreshUser = async () => {
    try {
      const response = await apiClient.get("/auth/me");
      setCurrentUser(response.data);
      return response.data;
    } catch (error) {
      logout();
      throw error;
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        await refreshUser();
      } catch (error) {
        console.error("Session verification failed:", error);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const value = useMemo(() => ({
    currentUser,
    loading,
    login,
    logout,
    refreshUser
  }), [currentUser, loading]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};