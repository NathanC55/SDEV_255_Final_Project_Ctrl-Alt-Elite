import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Courses() {
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
      <h2>Available Courses</h2>
      <Link to="/AddCourse" className="btn btn-success mb-3">
        Add New Course
      </Link>
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
              <tr key={course.id}>
                <td>{course.name}</td>
                <td>{course.subject}</td>
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
