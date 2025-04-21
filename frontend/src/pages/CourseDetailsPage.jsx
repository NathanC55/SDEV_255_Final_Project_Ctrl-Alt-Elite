import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses`)
      .then(res => {
        const found = res.data.find(c => c._id === id);
        setCourse(found);
      })
      .catch(err => console.error('Error fetching course:', err));
  }, [id]);

  if (!course) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>{course.name}</h2>
      <p><strong>Subject:</strong> {course.subject}</p>
      <p><strong>Credits:</strong> {course.credits}</p>
      <p><strong>Description:</strong> {course.description}</p>
    </div>
  );
}

export default CourseDetails;
