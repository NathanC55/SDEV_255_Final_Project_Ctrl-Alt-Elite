import React from "react";
import { Link } from "react-router-dom";
function Courses() {
  //dummy course data
  const courses = [
    {
      id: 1,
      name: "111 English Composition",
      subject: "English",
      credits: 3,
      description: "An introduction to English composition.",
    },
    { id: 2, name: "136 College Algebra", subject: "Math", credits: 3, description: "A college-level algebra course." },
    {
      id: 3,
      name: "255 Web Application Development",
      subject: "Software Development",
      credits: 3,
      description: "A course on web development.",
    },
  ];

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
                  <Link to={`/course/${course.id}`} className="btn btn-success btn-sm">
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
