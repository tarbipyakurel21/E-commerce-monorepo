import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';

const RegisterPage = () => {
  const [form, setForm] = useState({ email: '', username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
    <div className="container register-container">
      <h2 className="text-center">Register</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="btn btn-success w-100" type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
