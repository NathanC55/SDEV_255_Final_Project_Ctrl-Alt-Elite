import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jade-handsomely-snickerdoodle.glitch.me/api/courses")
      .then((response) => response.json())
      .then((data) => {
        const foundCourse = data.find((c) => c._id === id);
        setCourse(foundCourse);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const response = await fetch(`https://jade-handsomely-snickerdoodle.glitch.me/api/courses/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("Course deleted sucessfully.");
          navigate("/courses");
        } else {
          alert("Failed to delete course.");
        }
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("Error deleting course.");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/editcourse/${id}`);
  };

  if (!course) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>{course.name}</h2>
      <p>
        <strong>Subject:</strong> {course.subject}
      </p>
      <p>
        <strong>Credits:</strong> {course.credits}
      </p>
      <p>
        <strong>Description:</strong> {course.description}
      </p>

      <div className="mt-4">
        <button className="btn btn-warning me-2" onClick={handleEdit}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default CourseDetails;
