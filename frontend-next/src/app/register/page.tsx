'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext'; // update path as needed

const RegisterPage = () => {
  const { register } = useAuth(); // ✅ use register from context
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await register({
        identifier: form.email,
        username: form.name,
        password: form.password,
      });
      toast.success('Registration successful!');
      // router.push('/') is handled in context
    } catch (err: any) {
      console.error('Register error:', err);
      const msg =
        err?.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(msg);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-green-700">Create Your Account</h2>
      </div>

      <div className="w-full max-w-md bg-white p-6 rounded-md shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 font-medium text-sm">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-500"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium text-sm">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-500"
              placeholder="e.g. user@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium text-sm">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-500"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={!form.name || !form.email || !form.password}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-green-600 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-500">
        <p>
          <a href="#" className="mx-2 hover:underline">Terms</a>
          <a href="#" className="mx-2 hover:underline">Privacy</a>
          <a href="#" className="mx-2 hover:underline">Help</a>
        </p>
        <p className="mt-1">© 2025 MyShop</p>
      </div>
    </div>
  );
};

export default RegisterPage;
