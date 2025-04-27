import React from "react";

function DashBoard() {
  return (
    <div className="container mt-5">
      <h2 className="display-4 text-success">Welcome to the Dashboard</h2>
      <p className="lead">something here about the dashboard</p>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Card Title</h5>
              <p className="card-text">example text</p>
              <a href="#" className="btn btn-success">
                a button
              </a>
            </div>
          </div>
        </div>
        {/* add more cards or content */}
      </div>
    </div>
  );
}

export default DashBoard;
