import "./Navbar.css";
import {
    FaSearch,
    FaBell,
    FaUserCircle
} from "react-icons/fa";

import { useEffect, useState } from "react";
import api from "../../services/api";

function Navbar() {

    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {

        loadNotifications();

    }, []);

    async function loadNotifications() {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get("/claims", {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            setNotifications(res.data.slice(0, 5));

        } catch (err) {

            console.log(err);

        }

    }

    return (

        <div className="navbar">

            <div className="navbar-logo">

                <h2>Lost2Found</h2>

            </div>

            <div className="navbar-search">

                <FaSearch />

                <input
                    type="text"
                    placeholder="Search lost or found items..."
                />

            </div>

            <div className="navbar-right">

                <div
                    className="notification"
                    onClick={() => setOpen(!open)}
                >

                    <FaBell />

                    {

                        notifications.length > 0 && (

                            <span>

                                {notifications.length}

                            </span>

                        )

                    }

                    {

                        open && (

                            <div className="notification-dropdown">

                                {

                                    notifications.length === 0 ? (

                                        <p
                                            style={{
                                                padding: "20px",
                                                textAlign: "center"
                                            }}
                                        >

                                            No Notifications

                                        </p>

                                    ) : (

                                        notifications.map(notification => (

                                            <div
                                                key={notification.id}
                                                className="notification-item"
                                            >

                                                <strong>

                                                    {notification.foundItem?.title || "Found Item"}

                                                </strong>

                                                <br />

                                                Ownership Claim

                                                <br />

                                                Status :

                                                <b>

                                                    {" "}

                                                    {notification.status}

                                                </b>

                                            </div>

                                        ))

                                    )

                                }

                            </div>

                        )

                    }

                </div>

                <div className="profile-mini">

                    <FaUserCircle />

                    <p>

                        {localStorage.getItem("userName")}

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Navbar;