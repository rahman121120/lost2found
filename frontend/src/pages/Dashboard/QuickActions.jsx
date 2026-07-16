import "./QuickActions.css";
import { useNavigate } from "react-router-dom";

function QuickActions() {

    const navigate = useNavigate();

    return (

        <div className="quick-actions">

            <h2>

                ⚡ Quick Actions

            </h2>

            <div className="quick-grid">

                <div
                    className="quick-card"
                    onClick={() => navigate("/create-lost-item")}
                >

                    <div className="quick-icon">

                        📦

                    </div>

                    <h3>

                        Report Lost Item

                    </h3>

                    <p>

                        Create a new lost item report.

                    </p>

                </div>

                <div
                    className="quick-card"
                    onClick={() => navigate("/create-found-item")}
                >

                    <div className="quick-icon">

                        🎒

                    </div>

                    <h3>

                        Report Found Item

                    </h3>

                    <p>

                        Help someone recover belongings.

                    </p>

                </div>

                <div
                    className="quick-card"
                    onClick={() => navigate("/analytics")}
                >

                    <div className="quick-icon">

                        📊

                    </div>

                    <h3>

                        Analytics

                    </h3>

                    <p>

                        View recovery statistics and insights.

                    </p>

                </div>

                <div
                    className="quick-card"
                    onClick={() => navigate("/claims")}
                >

                    <div className="quick-icon">

                        📝

                    </div>

                    <h3>

                        My Claims

                    </h3>

                    <p>

                        Track your ownership claims.

                    </p>

                </div>

                <div
                    className="quick-card"
                    onClick={() => navigate("/notifications")}
                >

                    <div className="quick-icon">

                        🔔

                    </div>

                    <h3>

                        Notifications

                    </h3>

                    <p>

                        Check alerts and possible matches.

                    </p>

                </div>

                <div
                    className="quick-card"
                    onClick={() => navigate("/profile")}
                >

                    <div className="quick-icon">

                        👤

                    </div>

                    <h3>

                        Profile

                    </h3>

                    <p>

                        View and update your profile.

                    </p>

                </div>

            </div>

        </div>

    );

}

export default QuickActions;