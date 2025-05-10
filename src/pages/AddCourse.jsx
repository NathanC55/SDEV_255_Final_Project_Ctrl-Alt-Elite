import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const fetchURL = "https://hail-rounded-surfboard.glitch.me";

function AddCourse() {
  const [formData, setFormData] = useState({
    courseName: "",
    subjectArea: "",
    credits: 0,
    description: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "credits" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!formData.courseName || !formData.subjectArea || !formData.description) {
      setError("Please fill all required fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${fetchURL}/api/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseName: formData.courseName.trim(),
          subjectArea: formData.subjectArea.trim(),
          credits: Number(formData.credits),
          description: formData.description.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Course creation failed");
      }

      alert("Course created successfully!");
      navigate("/courses");
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Failed to create course");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add New Course</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Course Name*</label>
          <input
            type="text"
            name="courseName"
            className="form-control"
            value={formData.courseName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Subject Area*</label>
          <input
            type="text"
            name="subjectArea"
            className="form-control"
            value={formData.subjectArea}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Credits*</label>
          <input
            type="number"
            name="credits"
            min="1"
            max="10"
            className="form-control"
            value={formData.credits}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description*</label>
          <textarea
            name="description"
            className="form-control"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create Course
        </button>
      </form>
    </div>
  );
}

export default AddCourse;
