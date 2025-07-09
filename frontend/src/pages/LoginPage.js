import React, { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../api/auth";
import { jwtDecode } from "jwt-decode";
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken"); // or use context `token`
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        if (decoded.exp * 1000 > Date.now()) {
          navigate("/products");
        }
      } catch (e) {
        console.error("Invalid token format");
      }
    }
  }, []);


  const isTokenExpired = (decoded) => {
    return decoded.exp * 1000 < Date.now();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(form);
      const { accessToken, refreshToken, message } = response.data;

      if (!accessToken || typeof accessToken !== 'string' || accessToken.split('.').length !== 3) {
        alert("Login failed: Invalid token received from server.");
        return;
      }

      const decoded = jwtDecode(accessToken);
      if (isTokenExpired(decoded)) {
        alert("Login failed: Token is expired");
        return;
      }

      login(accessToken);
      navigate("/products");
    } catch (err) {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8081/oauth2/authorization/google";
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="text-center mb-4">
        <h2 className="text-primary">MyShop</h2>
      </div>
      <div className="card p-4 shadow-sm w-100" style={{ maxWidth: "400px" }}>
        <h5 className="mb-3">Sign in or create account</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Email or Mobile Number</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={form.identifier}
              onChange={(e) => setForm({ ...form, identifier: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-warning w-100">Continue</button>
        </form>

        <div className="text-center my-3">
          <small>By continuing, you agree to MyShop's <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.</small>
        </div>

        <div className="text-center mb-2">
          <button className="btn btn-outline-danger w-100" onClick={handleGoogleLogin}>
            <FaGoogle className="me-2" /> Continue with Google
          </button>
        </div>

        <div className="text-center">
          <small><a href="#">Need help?</a></small>
        </div>

        <hr />

        <div className="text-center">
          <small>Buying for work? <a href="#">Create a free business account</a></small>
        </div>

        <div className="text-center mt-3">
          <small>Don't have an account? <a href="/register">Register</a></small>
        </div>
      </div>

      <div className="mt-4 text-center">
        <small>
          <a href="#" className="mx-2">Conditions of Use</a>
          <a href="#" className="mx-2">Privacy Notice</a>
          <a href="#" className="mx-2">Help</a>
          <br />
          © 1996–2025, MyShop.com, Inc. or its affiliates
        </small>
      </div>
    </div>
  );
};

export default LoginPage;