import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddCourse() {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [credits, setCredits] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCourse = {
      name,
      subject,
      credits: parseInt(credits),
      description,
    };

    try {
    
      const response = await axios.post('http://localhost:5000/api/courses', newCourse);

      
      if (response.status === 201) {
        navigate('/courses'); 
      } else {
        console.error('Failed to add course');
      }
    } catch (err) {
      console.error('Error adding course:', err);
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
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Subject</label>
          <input
            type="text"
            className="form-control"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Credits</label>
          <input
            type="number"
            className="form-control"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Course
        </button>
      </form>
    </div>
  );
}

export default AddCourse;
