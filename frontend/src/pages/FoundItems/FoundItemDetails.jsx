import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Button from "../../components/common/Button";
import DeleteConfirmationModal from "../../components/common/DeleteConfirmationModal";
import "./FoundItemDetails.css";

function FoundItemDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [claims, setClaims] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const loggedUser = localStorage.getItem("userEmail");

    useEffect(() => {

    loadItem();

}, [id, loggedUser]);

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
            loadItem();

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
loadItem();

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
loadItem();
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

async function deleteFoundItem() {

    setShowDeleteModal(true);

}
async function confirmDeleteFoundItem() {

    try {

        const token = localStorage.getItem("token");

        const response = await api.delete(

            `/found-items/${item.id}`,

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        toast.success(response.data);

        setShowDeleteModal(false);

        navigate("/found-items", {

            replace: true

        });

    } catch (err) {

        console.error(err);

        toast.error("Unable to delete item.");

    }

}

function editFoundItem() {

    navigate(`/edit-found-item/${item.id}`);

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
item?.user?.email === loggedUser && (

<div
style={{
display:"flex",
gap:"15px",
margin:"20px 0"
}}
>

<Button

text="Edit Item"

icon="✏"

type="primary"

onClick={editFoundItem}

/>

<Button

text="Delete Item"

icon="🗑"

type="danger"

onClick={deleteFoundItem}

/>



</div>

)
}

                {

                    item?.user?.email !== loggedUser &&
item?.status !== "RETURNED" &&
item?.status !== "ARCHIVED" && (

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

                           <Button

text="Submit Ownership Claim"

type="primary"

onClick={submitClaim}

/>

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

                                   <div className="empty-state">

📭

<h3>No Ownership Claims Yet</h3>

<p>

No one has claimed this item yet.

</p>

</div>

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

                                                <span className={`claim-status ${claim.status.toLowerCase()}`}>

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

<Button

text="Approve"

type="success"

onClick={() => approveClaim(claim.id)}

/>

<Button

text="Reject"

type="danger"

onClick={() => rejectClaim(claim.id)}

/>

                                                    </div>

                                                )

                                            }

                                            {

                                                claim.status === "VERIFIED" && (

<Button

text="Mark Returned"

type="success"

onClick={() => confirmReturn(claim.id)}

/>

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
<DeleteConfirmationModal

open={showDeleteModal}

title="Delete Found Item"

message="Are you sure you want to permanently delete this found item?"

onCancel={() => setShowDeleteModal(false)}

onConfirm={confirmDeleteFoundItem}

/>
        </div>

    );

}

export default FoundItemDetails;