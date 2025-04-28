import React, { useState } from "react";

function AddCourse () {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    credits: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://jade-handsomely-snickerdoodle.glitch.me/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Course added successfully!");
        setFormData({ name: "", subject: "", credits: "", description: "" });
      } else {
        alert("Failed to add course.");
      }
    } catch (error) {
      console.error(error);
      alert("Error adding course.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Course Name</label>
          <input 
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Subject</label>
          <input
            type="text"
            name="subject" 
            className="form-control"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Credits</label>
          <input
            type="number"
            name="credits"  
            className="form-control"
            value={formData.credits}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea 
            name="description" 
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Add Course
        </button>
      </form>
    </div>
  );
}

export default AddCourse;
