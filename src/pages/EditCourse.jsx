import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const fetchURL = "https://noble-notch-locket.glitch.me";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    courseName: "",
    subjectArea: "",
    credits: 1,
    description: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Using token:", token);
        const response = await fetch(`${fetchURL}/api/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || "Failed to fetch course");
        }
        const data = await response.json();
        setCourse({
          courseName: data.courseName,
          subjectArea: data.subjectArea,
          credits: data.credits,
          description: data.description,
        });
      } catch (err) {
        console.error(err);
        setError("Error loading course data");
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: name === "credits" ? parseInt(value) || 1 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${fetchURL}/api/courses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseName: course.courseName,
          subjectArea: course.subjectArea,
          credits: Number(course.credits),
          description: course.description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update course");
      }

      alert("Course updated successfully!");
      navigate("/courses");
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Failed to update course");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Course</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Course Name*</label>
          <input
            type="text"
            name="courseName"
            className="form-control"
            value={course.courseName}
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
            value={course.subjectArea}
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
            value={course.credits}
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
