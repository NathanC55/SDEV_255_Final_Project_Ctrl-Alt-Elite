import React from "react";
import { Link } from "react-router-dom";

function CourseCard({ course }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{course.name}</h5>
          <p className="card-text">
            Subject: {course.subject}
            <br />
            Credits: {course.credits}
          </p>
          <Link to={`/course/${course._id}`} className="btn btn-success">
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
