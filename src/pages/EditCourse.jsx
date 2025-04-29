import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    name: "",
    subject: "",
    credits: "",
    description: "",
  });

  useEffect(() => {
    fetch(`https://jade-handsomely-snickerdoodle.glitch.me/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => setCourse(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://jade-handsomely-snickerdoodle.glitch.me/api/courses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course),
      });
      if (response.ok) {
        alert("Course updated successfully!");
        navigate("/courses");
      } else {
        alert("Failed to update course.");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating course.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={course.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            className="form-control"
            value={course.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Credits:</label>
          <input
            type="number"
            name="credits"
            className="form-control"
            value={course.credits}
            onChange={handleChange}
            required
            min="1"
            max="3"
          />
        </div>
        <div className="mb-3">
          <label>Description:</label>
          <textarea
            name="description"
            className="form-control"
            value={course.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditCourse;
