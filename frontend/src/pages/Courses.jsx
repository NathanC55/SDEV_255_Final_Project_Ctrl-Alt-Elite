import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Courses() {
  const [courses, setCourses] = useState([]);

 
  useEffect(() => {
    axios.get('http://localhost:5000/api/courses') 
      .then((response) => {
        setCourses(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []); 

  return (
    <div className="container mt-5">
      <h2>Available Courses</h2>
      <Link to="/add-course" className="btn btn-success mb-3">
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
              <tr key={course._id}> {/* MongoDB uses _id instead of id */}
                <td>{course.name}</td>
                <td>{course.subject}</td>
                <td>{course.credits}</td>
                <td>
                  <Link to={`/course/${course._id}`} className="btn btn-info btn-sm">
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
