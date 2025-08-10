import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { loginAdmin, clearStatus } from "../../redux/slices/adminSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { clearStatus, loginAdmin } from "../../../store/admin/admin-login";

function AdminLogin() {

  
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentAdmin, error, success, loading } = useSelector(state => state.adminAuth);

  // Handle input change
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(loginAdmin(form));    // form = { email, password }
  };

  // Toast and redirect handling
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-right" });
      dispatch((clearStatus));
    }
    if (success) {
      toast.success(success, { position: "top-right" });
      setTimeout(() => navigate("/admin"), 1200); // Redirect after toast
      dispatch(clearStatus());
    }
  }, [error, success, dispatch, navigate]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-400 overflow-hidden px-4 py-12">
      <ToastContainer />
      {/* Decorative SVG and card as before */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* ...SVGs... */}
      </div>
      <div className="relative w-full max-w-md bg-white backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-100 p-8 z-10 ring-1 ring-purple-100">
        <div className="flex flex-col items-center mb-8">
        </div>
        <form className="space-y-5" onSubmit={handleSubmit} autoComplete="off">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-purple-700">Email Address</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-purple-300 bg-white/85 focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-900 transition shadow-sm"
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-purple-700">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-purple-300 bg-white/85 focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-900 transition shadow-sm"
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>
        
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-700 via-purple-500 to-purple-400 hover:from-purple-900 hover:to-purple-500 text-white font-bold rounded-lg shadow-lg transition duration-150 hover:scale-105 focus:ring-2 focus:ring-purple-500"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-gray-700">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-purple-600 font-semibold hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
