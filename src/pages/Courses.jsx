import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const fetchURL = "http://localhost:3000";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get user role from token
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserRole(payload.role);
      } catch (err) {
        console.error("Error parsing token:", err);
      }
    }

    const fetchCourses = async () => {
      if (!token) {
        alert("You must be logged in to view courses.");
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`${fetchURL}/api/courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          console.error(data);
          setCourses([]);
          return;
        }

        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };

    fetchCourses();
  }, [navigate]);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Available Courses</h2>
        {/* Only show Add button for teachers */}
        {userRole === "teacher" && (
          <Link to="/AddCourse" className="btn btn-success">
            Add New Course
          </Link>
        )}
      </div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th>Course Name</th>
              <th>Subject</th>
              <th>Credits</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td>{course.courseName}</td>
                <td>{course.subjectArea}</td>
                <td>{course.credits}</td>
                <td>
                  <Link to={`/course/${course._id}`} className="btn btn-success btn-sm">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Courses;
