import "./Sidebar.css";
import { useNavigate, NavLink } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaBoxOpen,
  FaClipboardCheck,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
    const navigate = useNavigate();

function logout() {
    localStorage.removeItem("token");
    navigate("/");
}
  return (
    <div className="sidebar">

      <div className="logo">
        <h2>Lost2Found</h2>
      </div>

      <div className="menu">

        <NavLink to="/dashboard">
  <FaHome />
  <span>Dashboard</span>
</NavLink>

        <NavLink to="/lost-items">
  <FaSearch />
  <span>Lost Items</span>
</NavLink>

        <NavLink to="/found-items">
  <FaBoxOpen />
  <span>Found Items</span>
</NavLink>

        <NavLink to="/claims">
  <FaClipboardCheck />
  <span>Claims</span>
</NavLink>

        <NavLink to="/profile">
  <FaUser />
  <span>Profile</span>
</NavLink>

      </div>
<button className="logout-btn" onClick={logout}>
    Logout
</button>

    </div>
  );
}

export default Sidebar;