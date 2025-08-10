// check-auth.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

/**
 * Route protection for admin routes using Redux state:
 * - Only allows access to /admin routes if currentAdmin exists.
 * - Redirects to /admin-login if not authenticated.
 * - Prevents accessing /admin-login when already logged in.
 * - Redirects '/' to '/home'.
 */

function CheckAuth({ children }) {
  const location = useLocation();

  // Adjust this selector if your slice key is not "admin"
  // It should match the key used in your store, e.g. admin: adminReducer
  const {currentAdmin} = useSelector(state => state.adminAuth);

  console.log("Current Admin:", currentAdmin);
  

  // Redirect root '/' to '/home'
  if (location.pathname === "/") {
    return <Navigate to="/home" replace />;
  }

  // List of public pages; extend this array as needed
  const publicPaths = [
    "/admin-login",
    "/home"
    // Add more public routes here if needed
  ];

  // Determine if current route is public
  const isPublic = publicPaths.some(path => location.pathname === path);

  // If accessing an admin route (starts with /admin but not /admin-login) and not authenticated
  if (
    location.pathname.startsWith("/admin") &&
    location.pathname !== "/admin-login" &&
    !currentAdmin
  ) {
    return <Navigate to="/admin-login" replace />;
  }

  // If already authenticated, prevent visiting /admin-login
  if (
    location.pathname === "/admin-login" &&
    currentAdmin
  ) {
    return <Navigate to="/admin" replace />;
  }

  // Otherwise, allow
  return <>{children}</>;
}

export default CheckAuth;
