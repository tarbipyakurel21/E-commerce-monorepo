'use client';

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import UserPage from "@/app/login/UserPage"; // import the UserPage component
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const { login, user, loading } = useAuth();

  // Show UserPage if already logged in
  if (!loading && user) {
    return <UserPage />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form);
    } catch (err) {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/authorization/google`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-yellow-500">MyShop</h2>
      </div>

      <div className="bg-white w-full max-w-sm rounded-md shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Email | Username | Mobile Number
            </label>
            <input
              type="text"
              id="username"
              value={form.identifier}
              onChange={(e) => setForm({ ...form, identifier: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-300"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Continue
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-sm text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          className="w-full border border-red-500 text-red-500 hover:bg-red-100 py-2 px-4 rounded-md flex items-center justify-center gap-2"
          onClick={handleGoogleLogin}
        >
          <FaGoogle /> Continue with Google
        </button>

        <div className="text-center mt-4">
          <small className="text-sm text-gray-600">
            Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Sign Up</a>
          </small>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-500">
        <a href="#" className="mx-2 hover:underline">Terms</a>
        <a href="#" className="mx-2 hover:underline">Privacy</a>
        <a href="#" className="mx-2 hover:underline">Help</a><br />
        © 2025, MyShop.com
      </div>
    </div>
  );
};

export default LoginPage;
