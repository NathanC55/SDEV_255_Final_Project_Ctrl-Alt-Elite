import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <ol>
        <Link to="/">DashBoard</Link>
        <Link to="/courses">Courses</Link>
      </ol>
    </nav>
  );
}

export default NavBar;
