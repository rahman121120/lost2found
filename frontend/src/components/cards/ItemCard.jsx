import "./ItemCard.css";
import { useNavigate } from "react-router-dom";

function ItemCard({ item, type = "lost" }) {

    const navigate = useNavigate();

    function openDetails() {

        if (type === "found") {
            navigate(`/found-items/${item.id}`);
        } else {
            navigate(`/items/${item.id}`);
        }

    }

    const status = item.status || "UNKNOWN";

    const imageUrl = item.image
        ? `http://localhost:8080/uploads/${item.image}`
        : "https://placehold.co/600x400?text=No+Image";

    const postedDate = item.createdAt
        ? new Date(item.createdAt).toLocaleDateString()
        : "Recently";

    return (

        <div className="item-card">

            <div className="image-container">

                <img
                    src={imageUrl}
                    alt={item.title}
                    onError={(e) => {
                        e.target.src = "https://placehold.co/600x400?text=No+Image";
                    }}
                />

                <span
                    className={`status ${status.toLowerCase().replace(/\s+/g, "_")}`}
                >
                    {status}
                </span>

            </div>

            <div className="item-body">

                <h2>{item.title}</h2>

                <p>📍 {item.location || "Unknown Location"}</p>

                <p>🎒 {item.category || "Unknown Category"}</p>

                {
                    item.reward ? (

                        <p className="reward">

                            🎁 Reward: ₹{item.reward}

                        </p>

                    ) : (

                        <p className="reward">

                            🎁 No Reward

                        </p>

                    )
                }

                <p className="date">

                    🕒 Posted: {postedDate}

                </p>

                <button onClick={openDetails}>

                    View Details →

                </button>

            </div>

        </div>

    );

}

export default ItemCard;