import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";

const fetchURL = "http://localhost:3000";

function DashBoard() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in to view the dashboard.");
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`${fetchURL}/api/courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          console.error("Expected array of courses but got:", data);
          return;
        }

        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2 className="display-4 text-success">Welcome to the Dashboard</h2>
      <p className="lead">Check out the latest courses available:</p>

      <div className="row mt-4">
        {courses.length > 0 ? (
          courses.map((course) => <CourseCard key={course._id} course={course} />)
        ) : (
          <p>Loading courses...</p>
        )}
      </div>
    </div>
  );
}

export default DashBoard;
