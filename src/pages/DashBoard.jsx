import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";

const fetchURL = "https://hail-rounded-surfboard.glitch.me";

function DashBoard() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchedule = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${fetchURL}/api/schedule`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load schedule");
        }

        const data = await response.json();
        setSchedule(data);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [navigate]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="container mt-5 alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="display-4 text-success">My Schedule</h2>

      {schedule.length === 0 ? (
        <div className="alert alert-info mt-3">Your schedule is empty. Add courses from the Courses page.</div>
      ) : (
        <div className="row mt-4">
          {schedule.map((course) => (
            <CourseCard key={course._id} course={course} showRemoveButton={true} />
          ))}
        </div>
      )}
    </div>
  );
}

export default DashBoard;
