import React, { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard"; // adjust path if needed

function DashBoard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("https://jade-handsomely-snickerdoodle.glitch.me/api/courses")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCourses(data);
      })
      .catch((error) => console.error(error));
  }, []);

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
