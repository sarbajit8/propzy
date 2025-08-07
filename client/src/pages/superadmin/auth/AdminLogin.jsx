import React from "react";

function AdminLogin() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-400 overflow-hidden px-4 py-12">
      
      {/* Decorative SVGs – buildings/houses for real estate feel */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Large blurred circle */}
        <div className="absolute w-96 h-96 bg-purple-400 opacity-30 rounded-full right-0 bottom-0 filter blur-3xl"></div>
        {/* SVG Houses */}
        <svg width="200" height="80" viewBox="0 0 200 80" fill="none" className="absolute left-8 bottom-4 opacity-40">
          <rect x="20" y="40" width="40" height="30" fill="#a78bfa"/>
          <polygon points="40,10 15,40 65,40" fill="#6d28d9"/>
          <rect x="80" y="50" width="30" height="20" fill="#c4b5fd"/>
          <polygon points="95,30 78,50 112,50" fill="#7c3aed"/>
          {/* Add more buildings if you want */}
        </svg>
      </div>

      {/* Glassmorphism Card */}
      <div className="relative w-full max-w-md bg-white backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-100 p-8 z-10 ring-1 ring-purple-100">
        {/* Logo/Title with Icon */}
        <div className="flex flex-col items-center mb-8">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-purple-800/80 to-purple-400 shadow-lg mb-3">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="text-white">
              <path d="M3 12L12 3l9 9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <rect x="5" y="12" width="14" height="7" rx="1.5" fill="white" stroke="#a78bfa" strokeWidth="1"/>
            </svg>
          </span>
          <h1 className="text-4xl font-extrabold text-center text-purple-800 drop-shadow">Admin Login</h1>
        </div>

        {/* Login Form */}
        <form className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-purple-700" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-purple-300 bg-white/85 focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-900 transition shadow-sm"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-purple-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg border border-purple-300 bg-white/85 focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-900 transition shadow-sm"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <a href="#" className="text-xs text-purple-600 hover:underline font-medium">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-700 via-purple-500 to-purple-400 hover:from-purple-900 hover:to-purple-500 text-white font-bold rounded-lg shadow-lg transition duration-150 hover:scale-105 focus:ring-2 focus:ring-purple-500"
          >
            Login
          </button>
        </form>

        {/* Signup link */}
        <p className="mt-8 text-center text-sm text-gray-700">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-purple-600 font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
