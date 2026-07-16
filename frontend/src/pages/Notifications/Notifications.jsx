import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import "./Notifications.css";

function Notifications() {

    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadNotifications();

    }, []);

    async function loadNotifications() {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/notifications",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setNotifications(response.data);

        } catch (err) {

            console.error(err);
            toast.error("Unable to load notifications");

        } finally {

            setLoading(false);

        }

    }

    async function openNotification(notification) {

        try {

            const token = localStorage.getItem("token");

            await api.put(
                `/notifications/${notification.id}/read`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

        } catch (err) {

            console.error(err);

        }

        switch (notification.type) {

            case "MATCH_FOUND":
                navigate(`/found-items/${notification.referenceId}`);
                break;

            case "CLAIM_RECEIVED":
                navigate(`/found-items/${notification.referenceId}`);
                break;

            case "CLAIM_APPROVED":
                navigate("/claims");
                break;

            case "CLAIM_REJECTED":
                navigate("/claims");
                break;

            case "ITEM_RETURNED":
                navigate("/claims");
                break;

            default:
                navigate("/dashboard");

        }

    }

    if (loading) {

        return <LoadingSpinner />;

    }

    return (

        <div className="notifications-page">

            <h1 className="page-title">

                🔔 Notifications

            </h1>

            {

                notifications.length === 0 ? (

                    <div className="empty-state">

                        <h2>🔕</h2>

                        <h3>

                            No Notifications

                        </h3>

                        <p>

                            You're all caught up.

                        </p>

                    </div>

                ) : (

                    notifications.map(notification => (

                        <div
                            key={notification.id}
                            className={`notification-card ${notification.read ? "read" : "unread"}`}
                            onClick={() => openNotification(notification)}
                        >

                            <div className="notification-icon">

                                {

                                    notification.type === "MATCH_FOUND"
                                        ? "🎯"

                                        : notification.type === "CLAIM_RECEIVED"
                                            ? "📨"

                                            : notification.type === "CLAIM_APPROVED"
                                                ? "✅"

                                                : notification.type === "CLAIM_REJECTED"
                                                    ? "❌"

                                                    : notification.type === "ITEM_RETURNED"
                                                        ? "🎉"

                                                        : "🔔"

                                }

                            </div>

                            <div className="notification-content">

                                <h3>

                                    {notification.title}

                                </h3>

                                <p>

                                    {notification.message}

                                </p>

                                <small>

                                    {new Date(notification.createdAt).toLocaleString()}

                                </small>

                            </div>

                        </div>

                    ))

                )

            }

        </div>

    );

}

export default Notifications;