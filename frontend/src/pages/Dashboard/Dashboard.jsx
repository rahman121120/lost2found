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
    const [matches, setMatches] = useState([]);

    const [recentFoundItems, setRecentFoundItems] = useState([]);

    const [ownershipRequests, setOwnershipRequests] = useState([]);

    const [dashboard, setDashboard] = useState({
    myItems: 0,
    myClaims: 0,
    approvedClaims: 0,
    pendingClaims: 0,
    returnedItems: 0,
    activeFoundItems: 0,
    recoveryRate: 0
});

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();
        loadRecentItems();
        loadRecentFoundItems();
        loadMatches();
        loadOwnershipRequests();
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

    async function loadMatches() {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/dashboard/matches", {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            setMatches(response.data);

        } catch (err) {

            console.error(err);

        }

    }

    async function loadRecentFoundItems() {

    try {

        const token = localStorage.getItem("token");

        const res = await api.get("/found-items", {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        setRecentFoundItems(res.data.slice(0, 5));

    } catch (err) {

        console.error(err);

    }

}

async function loadOwnershipRequests() {

    try {

        const token = localStorage.getItem("token");

        const res = await api.get(
            "/dashboard/ownership-requests",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setOwnershipRequests(res.data);

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

                <div
                    onClick={() => navigate("/lost-items")}
                    style={{ cursor: "pointer" }}
                >

                    <StatCard
                        title="My Lost Items"
                        value={dashboard.myItems}
                        icon="📦"
                    />

                </div>

                <div
                    onClick={() => navigate("/claims")}
                    style={{ cursor: "pointer" }}
                >

                    <StatCard
                        title="My Claims"
                        value={dashboard.myClaims}
                        icon="📝"
                    />

                </div>

                <div
                    onClick={() => navigate("/claims")}
                    style={{ cursor: "pointer" }}
                >

                    <StatCard
                        title="Verified"
                        value={dashboard.approvedClaims}
                        icon="✅"
                    />

                </div>

                <div
                    onClick={() => navigate("/claims")}
                    style={{ cursor: "pointer" }}
                >

                    <StatCard
                        title="Pending"
                        value={dashboard.pendingClaims}
                        icon="⏳"
                    />

                </div>

            </div>

            <QuickActions />

            <div className="recovery-summary">

    <h2>📈 Recovery Summary</h2>

    <div className="summary-grid">

        <div className="summary-card">
            <h3>{dashboard.returnedItems}</h3>
            <p>Returned Items</p>
        </div>

        <div className="summary-card">
            <h3>{dashboard.activeFoundItems}</h3>
            <p>Active Found Items</p>
        </div>

        <div className="summary-card">
            <h3>{dashboard.recoveryRate}%</h3>
            <p>Recovery Rate</p>
        </div>

    </div>

</div>

            <div className="match-section">

                <h2>

                    🔔 Possible Matches

                </h2>

                {

                    matches.length === 0 ? (

                        <p className="empty-text">

                            No possible matches right now.

                        </p>

                    ) : (

                        matches.map(match => (

                            <div
                                key={match.foundItemId}
                                className="match-card"
                            >

                                <img
                                    src={
                                        match.image
                                            ? `http://localhost:8080/uploads/${match.image}`
                                            : "https://placehold.co/100x100?text=No+Image"
                                    }
                                    alt={match.foundItemTitle}
                                />

                                <div style={{ flex: 1 }}>

                                    <h3>

                                        {match.foundItemTitle}

                                    </h3>

                                    <p>

                                        Matches your lost item:

                                        <strong>

                                            {" "}{match.lostItemTitle}

                                        </strong>

                                    </p>

                                    <p>

                                        📍 {match.location}

                                    </p>

                                </div>

                                <button
                                    onClick={() =>
                                        navigate(`/found-items/${match.foundItemId}`)
                                    }
                                >

                                    View Match

                                </button>

                            </div>

                        ))

                    )

                }

            </div>

            <div className="ownership-section">

    <h2>📝 Pending Ownership Requests</h2>

    {

        ownershipRequests.length === 0 ? (

            <p className="empty-text">

                No pending ownership requests.

            </p>

        ) : (

            ownershipRequests.map(request => (

                <div
                    key={request.id}
                    className="ownership-card"
                >

                    <h3>

                        {request.foundItem.title}

                    </h3>

                    <p>

                        Claimant:

                        <strong>

                            {request.claimant.name}

                        </strong>

                    </p>

                    <p>

                        {request.message}

                    </p>

                    <button
                        onClick={() =>
                            navigate(`/found-items/${request.foundItem.id}`)
                        }
                    >

                        Review Claim

                    </button>

                </div>

            ))

        )

    }

</div>

{/* ================= Recent Lost Items ================= */}

<div className="recent-lost-section">

    <div
        style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px"
        }}
    >

        <h2>📦 Recent Lost Items</h2>

        <button
            onClick={() => navigate("/lost-items")}
            className="view-all"
        >
            View All
        </button>

    </div>

    {

        recentItems.length === 0 ? (

            <div className="empty-state">

                <h2>📭</h2>

                <h3>No Lost Items</h3>

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
                    style={{ cursor: "pointer" }}
                >

                    <strong>

                        📦 {item.title}

                    </strong>

                    <span>

                        {item.status}

                    </span>

                </div>

            ))

        )

    }

</div>

{/* ================= Recent Found Items ================= */}

<div className="recent-found-section">

    <div
        style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px"
        }}
    >

        <h2>🎒 Recent Found Items</h2>

        <button
            onClick={() => navigate("/found-items")}
            className="view-all"
        >
            View All
        </button>

    </div>

    {

        recentFoundItems.length === 0 ? (

            <div className="empty-state">

                <h2>🎒</h2>

                <h3>No Found Items</h3>

                <p>

                    Recently reported found items will appear here.

                </p>

            </div>

        ) : (

            recentFoundItems.map(item => (

                <div
                    key={item.id}
                    className="recent-item"
                    onClick={() => navigate(`/found-items/${item.id}`)}
                    style={{ cursor: "pointer" }}
                >

                    <strong>

                        🎒 {item.title}

                    </strong>

                    <span>

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