import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';

const RegisterPage = () => {
  const [form, setForm] = useState({ email: '', username: '', password: '' });
  const navigate = useNavigate();

  // onchange 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // use registerUser api
      // navigate login on successfull register
      const response = await registerUser(form);
      console.log('Register success:', response.data.message);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      console.error('Register error:', err);
      alert('Registration failed. Email or username may already exist.');
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="text-center mb-4">
        <h2 className="text-primary">Create Your Account</h2>
      </div>

      <div className="card p-4 shadow-sm w-100" style={{ maxWidth: '400px' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="e.g. user@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Choose a username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <hr />
          <button className="btn btn-success w-100" type="submit">Register</button>
        </form>
      

        <div className="text-center mt-3">
          <small>Already have an account? <a href="/login">Login</a></small>
        </div>
      </div>

      <div className="mt-4 text-center">
        <small>
          <a href="#" className="mx-2">Terms</a>
          <a href="#" className="mx-2">Privacy</a>
          <a href="#" className="mx-2">Help</a>
        </small>
        <br />
        <small>© 2025 MyShop</small>
      </div>
    </div>
  );
};

export default RegisterPage;
