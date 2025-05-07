import React from "react";
import { useNavigate } from "react-router-dom";

const fetchURL = "https://noble-notch-locket.glitch.me";

function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: e.target.email.value.trim(),
      password: e.target.password.value,
      role: e.target.role.value,
    };

    try {
      const response = await fetch(`${fetchURL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg" style={{ maxWidth: "400px", margin: "auto" }}>
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Create an Account</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input type="email" name="email" className="form-control" id="email" placeholder="Enter email" required />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm password"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select name="role" id="role" className="form-select" defaultValue="teacher" required>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="btn btn-success w-100">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
