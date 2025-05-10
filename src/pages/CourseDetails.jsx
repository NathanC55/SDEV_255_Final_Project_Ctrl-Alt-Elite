import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const fetchURL = "https://hail-rounded-surfboard.glitch.me";

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [inSchedule, setInSchedule] = useState(false);
  useEffect(() => {
    const checkSchedule = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserRole(payload.role);
      }
      const response = await fetch(`${fetchURL}/api/schedule`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const schedule = await response.json();
      setInSchedule(schedule.some((c) => c._id === id));
    };
    checkSchedule();
  }, [id]);

  <button onClick={() => addToSchedule(course._id)} className="btn btn-primary" disabled={inSchedule}>
    {inSchedule ? "Already in Schedule" : "Add to Schedule"}
  </button>;

  {
    inSchedule && (
      <button onClick={() => removeFromSchedule(course._id)} className="btn btn-danger ms-2">
        Remove from Schedule
      </button>
    );
  }
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  console.log("Token:", token);
  const addToSchedule = async (courseId) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${fetchURL}/api/schedule/add/${courseId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    alert(data.message);
  };

  const removeFromSchedule = async (courseId) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${fetchURL}/api/schedule/remove/${courseId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    alert(data.message);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token"); // Get JWT from storage
      if (!token) {
        alert("You must be logged in to view course details.");
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`${fetchURL}/api/courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          console.error("Expected an array but got:", data);
          return;
        }

        const foundCourse = data.find((c) => c._id === id);
        setCourse(foundCourse);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [id, navigate]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to delete a course.");
      navigate("/login");
      return;
    }

    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const response = await fetch(`${fetchURL}/api/courses/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          alert("Course deleted successfully.");
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
      <h2>{course.courseName}</h2>
      <p>
        <strong>Subject:</strong> {course.subjectArea}
      </p>
      <p>
        <strong>Credits:</strong> {course.credits}
      </p>
      <p>
        <strong>Description:</strong> {course.description}
      </p>

      <div className="mt-4">
        {userRole === "teacher" && (
          <>
            <button className="btn btn-warning me-2" onClick={handleEdit}>
              Edit
            </button>
            <button className="btn btn-danger me-2" onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
        <button onClick={() => addToSchedule(course._id)} className="btn btn-primary" disabled={inSchedule}>
          {inSchedule ? "Already in Schedule" : "Add to Schedule"}
        </button>

        {inSchedule && (
          <button onClick={() => removeFromSchedule(course._id)} className="btn btn-danger ms-2">
            Remove from Schedule
          </button>
        )}
      </div>
    </div>
  );
}

export default CourseDetails;
