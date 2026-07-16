import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
    FaHome,
    FaSearch,
    FaBoxOpen,
    FaClipboardCheck,
    FaUser,
    FaChartBar,
    FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {

    const navigate = useNavigate();

    function logout() {

        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");

        navigate("/", { replace: true });

    }

    return (

        <div className="sidebar">

            <div className="logo">

                <h2>Lost2Found</h2>

            </div>

            <div className="menu">

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                >
                    <FaHome />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/analytics"
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                >
                    <FaChartBar />
                    <span>Analytics</span>
                </NavLink>

                <NavLink
                    to="/lost-items"
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                >
                    <FaSearch />
                    <span>Lost Items</span>
                </NavLink>

                <NavLink
                    to="/found-items"
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                >
                    <FaBoxOpen />
                    <span>Found Items</span>
                </NavLink>

                <NavLink
                    to="/claims"
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                >
                    <FaClipboardCheck />
                    <span>My Claims</span>
                </NavLink>

                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                >
                    <FaUser />
                    <span>Profile</span>
                </NavLink>

            </div>

            <button
                className="logout-btn"
                onClick={logout}
            >

                <FaSignOutAlt />

                <span style={{ marginLeft: "8px" }}>

                    Logout

                </span>

            </button>

        </div>

    );

}

export default Sidebar;