import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import DashBoard from "./pages/DashBoard";
import Courses from "./pages/Courses";

function App() {
  return (
    <Router basename="/SDEV_255_Final_Project_Ctrl-Alt-Elite">
      <NavBar />
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </Router>
  );
}

export default App;
