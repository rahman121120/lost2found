import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../services/api";
import "./Dashboard.css";
import StatCard from "../../components/cards/StatCard";
import QuickActions from "./QuickActions";
import LoadingSpinner from "../../components/common/LoadingSpinner";

function Dashboard() {

    const navigate = useNavigate();

    const [recentItems, setRecentItems] = useState([]);

    const [dashboard, setDashboard] = useState({
        myItems: 0,
        myClaims: 0,
        approvedClaims: 0,
        pendingClaims: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();
        loadRecentItems();

    }, []);

    async function loadDashboard() {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get("/dashboard", {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            setDashboard(res.data);

        } catch (err) {

            console.error(err);
            toast.error("Unable to load dashboard");

        } finally {

            setLoading(false);

        }

    }

    async function loadRecentItems() {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get("/items", {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            setRecentItems(res.data.slice(0, 5));

        } catch (err) {

            console.error(err);

        }

    }

    if (loading) {

        return <LoadingSpinner />;

    }

    return (

        <div className="dashboard">

            <div className="welcome">

                <h1>

                    Welcome back, {localStorage.getItem("userName") || "Student"} 👋

                </h1>

                <p>

                    Campus Lost & Found Management System

                </p>

            </div>

            <div className="dashboard-grid">

                <div onClick={() => navigate("/lost-items")} style={{cursor:"pointer"}}>

                    <StatCard
                        title="My Lost Items"
                        value={dashboard.myItems}
                        icon="📦"
                    />

                </div>

                <div onClick={() => navigate("/claims")} style={{cursor:"pointer"}}>

                    <StatCard
                        title="My Claims"
                        value={dashboard.myClaims}
                        icon="📝"
                    />

                </div>

                <div onClick={() => navigate("/claims")} style={{cursor:"pointer"}}>

                    <StatCard
                        title="Verified"
                        value={dashboard.approvedClaims}
                        icon="✅"
                    />

                </div>

                <div onClick={() => navigate("/claims")} style={{cursor:"pointer"}}>

                    <StatCard
                        title="Pending"
                        value={dashboard.pendingClaims}
                        icon="⏳"
                    />

                </div>

            </div>

            <QuickActions />

            <div className="recent-activity">

                <div
                    style={{
                        display:"flex",
                        justifyContent:"space-between",
                        alignItems:"center",
                        marginBottom:"20px"
                    }}
                >

                    <h2>

                        Recent Lost Items

                    </h2>

                    <button
                        onClick={() => navigate("/lost-items")}
                        style={{
                            border:"none",
                            background:"transparent",
                            color:"#2563EB",
                            cursor:"pointer",
                            fontWeight:"600"
                        }}
                    >

                        View All

                    </button>

                </div>

                {

                    recentItems.length === 0 ? (

                        <div className="empty-state">

                            <h2>📭</h2>

                            <h3>No Recent Activity</h3>

                            <p>

                                Your recently reported lost items will appear here.

                            </p>

                        </div>

                    ) : (

                        recentItems.map(item => (

                            <div
                                key={item.id}
                                className="recent-item"
                                onClick={() => navigate(`/items/${item.id}`)}
                                style={{cursor:"pointer"}}
                            >

                                <strong>📦 {item.title}</strong>

                                <span
                                    style={{
                                        float:"right",
                                        color:"#666",
                                        fontSize:"14px"
                                    }}
                                >

                                    {item.status}

                                </span>

                            </div>

                        ))

                    )

                }

            </div>

        </div>

    );

}

export default Dashboard;