import React from "react";
import { useParams } from "react-router-dom";

function CourseDetails () {

    //dummy course data
    const courses = [
        { id: 1, name: "111 English Composition", subject: "English", credits: 3, description: "An introduction to English composition." },
        { id: 2, name: "136 College Algebra", subject: "Math", credits: 3, description: "A college-level algebra course." },
        { id: 3, name: "255 Web Application Development", subject: "Software Development", credits: 3, description: "A course on web development." }
      ];

      const { id } = useParams(); 
      const course = courses.find(c => c.id === parseInt(id)); 
    
      if (!course) {
        return <p>Course not found!</p>;
      }

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