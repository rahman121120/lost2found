import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import "./FoundItemDetails.css";

function FoundItemDetails() {

    const { id } = useParams();

    const [item, setItem] = useState(null);
    const [claims, setClaims] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const loggedUser = localStorage.getItem("userEmail");

    useEffect(() => {
        loadItem();
    }, [id]);

    async function loadItem() {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(`/found-items/${id}`, {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            setItem(response.data);

            if (response.data?.user?.email === loggedUser) {
                loadClaims();
            }

        } catch (err) {

            console.error(err);

            toast.error("Unable to load item.");

        } finally {

            setLoading(false);

        }

    }

    async function loadClaims() {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(

                `/claims/found-item/${id}`,

                {

                    headers: {
                        Authorization: `Bearer ${token}`
                    }

                }

            );

            setClaims(response.data);

        } catch (err) {

            console.error(err);

        }

    }

    async function submitClaim() {

        if (!message.trim()) {

            toast.error("Please explain why this item belongs to you.");

            return;

        }

        try {

            const token = localStorage.getItem("token");

            const response = await api.post(

                "/claims",

                {

                    foundItemId: item.id,
                    message

                },

                {

                    headers: {
                        Authorization: `Bearer ${token}`
                    }

                }

            );

            toast.success(response.data);

            setMessage("");

        } catch (err) {

            console.error(err);

            toast.error(err.response?.data || "Unable to submit claim.");

        }

    }

    async function approveClaim(claimId) {

        try {

            const token = localStorage.getItem("token");

            const response = await api.put(

                `/claims/${claimId}/approve`,

                {},

                {

                    headers: {
                        Authorization: `Bearer ${token}`
                    }

                }

            );

            toast.success(response.data);

            loadClaims();

        } catch (err) {

            console.error(err);

            toast.error("Unable to approve claim.");

        }

    }

    async function rejectClaim(claimId) {

        try {

            const token = localStorage.getItem("token");

            const response = await api.put(

                `/claims/${claimId}/reject`,

                {},

                {

                    headers: {
                        Authorization: `Bearer ${token}`
                    }

                }

            );

            toast.success(response.data);

            loadClaims();

        } catch (err) {

            console.error(err);

            toast.error("Unable to reject claim.");

        }

    }

    async function confirmReturn(claimId) {

        try {

            const token = localStorage.getItem("token");

            const response = await api.put(

                `/claims/${claimId}/confirm`,

                {},

                {

                    headers: {
                        Authorization: `Bearer ${token}`
                    }

                }

            );

            toast.success(response.data);

            loadClaims();
            loadItem();

        } catch (err) {

            console.error(err);

            toast.error("Unable to confirm return.");

        }

    }

    if (loading) {

        return <LoadingSpinner />;

    }

    return (

        <div className="details-container">

            <img

                src={

                    item?.image

                        ? `http://localhost:8080/uploads/${item.image}`

                        : "https://placehold.co/600x400?text=No+Image"

                }

                alt={item?.title}

            />

            <div className="details-content">

                <h1>{item?.title}</h1>

                <p><b>Category:</b> {item?.category}</p>

                <p><b>Location:</b> {item?.location}</p>

                <p><b>Description:</b> {item?.description}</p>

                <p><b>Status:</b> {item?.status}</p>

                <p><b>Found By:</b> {item?.user?.name}</p>

                {

                    item?.user?.email !== loggedUser && (

                        <>

                            <hr />

                            <h3>

                                Why does this item belong to you?

                            </h3>

                            <textarea

                                value={message}

                                onChange={(e) => setMessage(e.target.value)}

                                placeholder="Explain why you are the genuine owner."

                            />

                            <button

                                style={{ marginTop: "15px" }}

                                onClick={submitClaim}

                            >

                                Submit Ownership Claim

                            </button>

                        </>

                    )

                }

                {

                    item?.user?.email === loggedUser && (

                        <>

                            <hr />

                            <h2>

                                Ownership Claims

                            </h2>

                            {

                                claims.length === 0 ? (

                                    <p>No ownership claims yet.</p>

                                ) : (

                                    claims.map((claim) => (

                                        <div

                                            key={claim.id}

                                            className="claim-card"

                                        >

                                            <h3>

                                                {claim.claimant?.name}

                                            </h3>

                                            <p>

                                                {claim.message}

                                            </p>

                                            <p>

                                                <b>Status:</b>{" "}

                                                <span>

                                                    {claim.status}

                                                </span>

                                            </p>

                                            {

                                                claim.status === "PENDING" && (

                                                    <div

                                                        style={{

                                                            display: "flex",

                                                            gap: "10px",

                                                            marginTop: "15px"

                                                        }}

                                                    >

                                                        <button

                                                            onClick={() => approveClaim(claim.id)}

                                                        >

                                                            Approve

                                                        </button>

                                                        <button

                                                            onClick={() => rejectClaim(claim.id)}

                                                        >

                                                            Reject

                                                        </button>

                                                    </div>

                                                )

                                            }

                                            {

                                                claim.status === "VERIFIED" && (

                                                    <button

                                                        style={{ marginTop: "15px" }}

                                                        onClick={() => confirmReturn(claim.id)}

                                                    >

                                                        Mark Returned

                                                    </button>

                                                )

                                            }

                                        </div>

                                    ))

                                )

                            }

                        </>

                    )

                }

            </div>

        </div>

    );

}

export default FoundItemDetails;