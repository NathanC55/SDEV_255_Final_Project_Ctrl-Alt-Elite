import React from "react";
import { Link } from "react-router-dom";

function CourseCard({ course, showRemoveButton = false }) {
  const removeFromSchedule = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/schedule/remove/${courseId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove course");
      }

      // You might want to refresh the schedule or use state management
      window.location.reload();
    } catch (err) {
      console.error("Error:", err);
      alert(err.message);
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{course.courseName}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {course.subjectArea} • {course.credits} credits
          </h6>
          <p className="card-text">{course.description}</p>
        </div>
        {showRemoveButton && (
          <div className="card-footer">
            <button onClick={() => removeFromSchedule(course._id)} className="btn btn-sm btn-danger">
              Remove from Schedule
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseCard;
