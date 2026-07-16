import "./Topbar.css";
import { FaBell } from "react-icons/fa";
import GlobalSearch from "../search/GlobalSearch";

function Topbar() {

    return (

        <div className="topbar">

            <div className="topbar-title">

                <h2>

                    Lost2Found

                </h2>

            </div>

            <div className="top-actions">

                <GlobalSearch />

                <button
                    className="notification-btn"
                    title="Notifications"
                >

                    <FaBell />

                </button>

            </div>

        </div>

    );

}

export default Topbar;