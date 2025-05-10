import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const fetchURL = "https://noble-notch-locket.glitch.me";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle login submit
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend API
      const res = await fetch(`${fetchURL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/");
        window.location.reload();
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg" style={{ maxWidth: "400px", margin: "auto" }}>
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Login</h5>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="d-flex justify-content-between">
              <p>
                Don't have an account? <Link to="/signUp">Sign Up</Link>
              </p>
            </div>

            <button type="submit" className="btn btn-success">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
