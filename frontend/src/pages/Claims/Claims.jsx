import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Button from "../../components/common/Button";
import "./Claims.css";

function Claims() {

    const navigate = useNavigate();

    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadClaims();

    }, []);

    async function loadClaims() {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get("/claims", {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            setClaims(res.data);

        } catch (err) {

            console.error(err);

            toast.error("Unable to load claims");

        } finally {

            setLoading(false);

        }

    }

    if (loading) {

        return <LoadingSpinner />;

    }

    return (

        <div className="page-container">

            <h1 className="page-title">

                My Ownership Claims

            </h1>

            {

                claims.length === 0 ? (

                    <div className="empty-state">

                        <h2>📋</h2>

                        <h3>No Claims Yet</h3>

                        <p>

                            You haven't submitted any ownership claims yet.

                        </p>

                    </div>

                ) : (

                    claims.map((claim) => (

                        <div
                            key={claim.id}
                            className="claim-card"
                        >

                            <h2>

                                {claim.foundItem?.title || "Unknown Found Item"}

                            </h2>

                            <p>

                                <strong>Found By :</strong>{" "}

                                {claim.foundItem?.user?.name || "Unknown"}

                            </p>

                            <p>

                                <strong>Location :</strong>{" "}

                                {claim.foundItem?.location || "-"}

                            </p>

                            <p>

                                <strong>Your Proof :</strong>

                            </p>

                            <p>

                                {claim.message}

                            </p>

                            <p>

                                <strong>Status :</strong>{" "}

                                <span
                                    className={`claim-status ${claim.status.toLowerCase()}`}
                                >

                                    {claim.status}

                                </span>

                            </p>

                            {

                                claim.foundItem && (

                                    <div
                                        style={{
                                            marginTop: "18px"
                                        }}
                                    >

                                        <Button
                                            text="View Found Item"
                                            icon="👀"
                                            type="primary"
                                            onClick={() =>
                                                navigate(`/found-items/${claim.foundItem.id}`)
                                            }
                                        />

                                    </div>

                                )

                            }

                        </div>

                    ))

                )

            }

        </div>

    );

}

export default Claims;