import { HashRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import DashBoard from "./pages/DashBoard";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import AddCourse from "./pages/AddCourse";
import CourseDetails from "./pages/CourseDetails";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
