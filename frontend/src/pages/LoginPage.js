import React, { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { decodeToken } from "../utils/JwtUtils";
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {
  const [form, setForm] = useState({ identifier: "", password: "" });
  //use authContext for login
  const { login } = useAuth();
  const navigate = useNavigate();

  // check if we already have the token to avoid login
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken"); 
    if (storedToken) {
      try {
        //decode the token 
        const decoded=decodeToken(storedToken);
       if(!isTokenExpired(decoded)){
          navigate("/products");
        }
      } catch (e) {
        console.error("Invalid token format");
      }
    }
  }, []);

// check if token is expired
  const isTokenExpired = (decoded) => {
    return decoded.exp * 1000 < Date.now();
  };

  // handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // use authcontext with form
      const response = await login(form);
      navigate("/");
    } catch (err) {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_URL}/oauth2/authorization/google`;
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
        <hr />
        <div className="text-center mb-2 mt-3">
          <button className="btn btn-outline-danger w-100" onClick={handleGoogleLogin}>
            <FaGoogle className="me-2" /> Continue with Google
          </button>
        </div>

        
       

        <div className="text-center mt-3">
          <small>Don't have an account? <a href="/register">Register</a></small>
        </div>
      </div>

      <div className="mt-4 text-center">
        <small>
          <a href="#" className="mx-2">Terms</a>
          <a href="#" className="mx-2">Privacy</a>
          <a href="#" className="mx-2">Help</a>
          <br />
          © 2025, MyShop.com
        </small>
      </div>
    </div>
  );
};

export default LoginPage;