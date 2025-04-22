import { HashRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import DashBoard from "./pages/DashBoard";
import Courses from "./pages/Courses";
import AddCourse from './pages/AddCourse'; 
import CourseDetailsPage from './pages/CourseDetailsPage'; 
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  return (
    <Router>
      <NavBar />
      
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/course/:id" element={<CourseDetailsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
     
    </Router>
  );
}

export default App;
