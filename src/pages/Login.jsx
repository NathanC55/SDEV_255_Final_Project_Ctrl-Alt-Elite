import { Link } from 'react-router-dom';
import React from "react";

function Login() {
return (
  <div className="container mt-5">
    <div className="card shadow-lg" style={{ maxWidth: '400px', margin: 'auto' }}>
      <div className="card-body">
        <h5 className="card-title text-center mb-4">Login</h5>
        <form >
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control"id="email" placeholder="Enter email" required/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter password" required/>
          </div>
          <div className="d-flex justify-content-between">
            <p>Don't have an account? <Link to="/SignUp">Sign Up</Link></p>
          </div>
          <button type="submit" className="btn btn-success">Login</button>
        </form>
      </div>
    </div>
  </div>
);
}

export default Login;
  