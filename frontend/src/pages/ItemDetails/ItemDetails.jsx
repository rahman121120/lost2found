import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import "./ItemDetails.css";

function ItemDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadData();

    }, []);

    async function loadData() {

        setLoading(true);

        await Promise.all([
            loadItem(),
            loadMatches()
        ]);

        setLoading(false);

    }

    async function loadItem() {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(

                `/items/${id}`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setItem(response.data);

        } catch (error) {

            console.error(error);

            toast.error("Unable to load lost item");

        }

    }

    async function loadMatches() {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(

                `/found-items/matches/${id}`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setMatches(response.data);

        } catch (error) {

            console.error(error);

        }

    }

    if (loading) {

        return <LoadingSpinner />;

    }

    if (!item) {

        return <h2>Lost Item Not Found</h2>;

    }

    return (

        <div className="details-container">

            <div className="details-image">

                <img
                    src={
                        item.image
                            ? `http://localhost:8080/uploads/${item.image}`
                            : "https://placehold.co/700x500?text=No+Image"
                    }
                    alt={item.title}
                />

            </div>

            <div className="details-content">

                <h1>{item.title}</h1>

                <span className={`status-badge ${item.status.toLowerCase()}`}>
                    {item.status}
                </span>

                <hr />

                <p>

                    <strong>Category :</strong> {item.category}

                </p>

                <p>

                    <strong>Lost Location :</strong> {item.location}

                </p>

                <p>

                    <strong>Description :</strong>

                </p>

                <p>

                    {item.description}

                </p>

                {

                    item.reward && Number(item.reward) > 0 && (

                        <p>

                            <strong>Reward :</strong> ₹ {item.reward}

                        </p>

                    )

                }

                <hr />

                <h3>

                    Reported By

                </h3>

                <p>

                    <strong>Name :</strong> {item.user?.name}

                </p>

                <p>

                    <strong>Department :</strong> {item.user?.department}

                </p>

                <p>

                    <strong>Year :</strong> {item.user?.year}

                </p>

                <p>

                    <strong>Status :</strong> {item.status}

                </p>

                <div
                    style={{
                        marginTop: "30px",
                        padding: "18px",
                        background: "#EEF6FF",
                        borderRadius: "12px",
                        borderLeft: "5px solid #2563EB"
                    }}
                >

                    <strong>Notice</strong>

                    <p style={{ marginTop: "10px" }}>

                        If you have found this item or have any information about it,
                        please contact the owner directly or create a Found Item post
                        so the owner can identify and claim it.

                    </p>

                </div>

                <hr style={{ margin: "40px 0" }} />

                <h2>

                    🔍 Possible Matching Found Items

                </h2>

                {

                    matches.length === 0 ? (

                        <div
                            style={{
                                marginTop: "20px",
                                padding: "20px",
                                background: "#F9FAFB",
                                borderRadius: "12px"
                            }}
                        >

                            <p>

                                No matching found items yet.

                            </p>

                        </div>

                    ) : (

                        matches.map(match => (

                            <div
                                key={match.id}
                                style={{
                                    display: "flex",
                                    gap: "20px",
                                    alignItems: "center",
                                    marginTop: "20px",
                                    padding: "18px",
                                    borderRadius: "12px",
                                    background: "#fff",
                                    boxShadow: "0 4px 15px rgba(0,0,0,.08)"
                                }}
                            >

                                <img
                                    src={
                                        match.image
                                            ? `http://localhost:8080/uploads/${match.image}`
                                            : "https://placehold.co/150x120?text=No+Image"
                                    }
                                    alt={match.title}
                                    style={{
                                        width: "150px",
                                        height: "120px",
                                        objectFit: "cover",
                                        borderRadius: "10px"
                                    }}
                                />

                                <div style={{ flex: 1 }}>

                                    <h3>

                                        {match.title}

                                    </h3>

                                    <p>

                                        <strong>Category :</strong> {match.category}

                                    </p>

                                    <p>

                                        <strong>Location :</strong> {match.location}

                                    </p>

                                    <p>

                                        <strong>Status :</strong> {match.status}

                                    </p>

                                    <button

                                        style={{
                                            marginTop: "12px",
                                            background: "#2563EB",
                                            color: "white",
                                            border: "none",
                                            padding: "10px 18px",
                                            borderRadius: "8px",
                                            cursor: "pointer"
                                        }}

                                        onClick={() => navigate(`/found-items/${match.id}`)}

                                    >

                                        View Found Item

                                    </button>

                                </div>

                            </div>

                        ))

                    )

                }

            </div>

        </div>

    );

}

export default ItemDetails;