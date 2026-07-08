import "./ItemCard.css";
import { useNavigate } from "react-router-dom";

function ItemCard({ item }) {
    const navigate = useNavigate();

    return (

        <div className="item-card">

           <img
    src={
        item.image
            ? `http://localhost:8080/uploads/${item.image}`
            : "https://placehold.co/600x400?text=No+Image"
    }
    alt={item.title}
/>

            <div className="item-body">

                <div className="item-header">

                    <h3>{item.title}</h3>

                    <span className={item.status.toLowerCase()}>
                        {item.status}
                    </span>

                </div>

                <p><b>📍</b> {item.location}</p>

                <p><b>🎒</b> {item.category}</p>

                <p><b>💰</b> ₹ {item.reward}</p>

                <button onClick={() => navigate(`/items/${item.id}`)}>
    View Details
</button>

            </div>

        </div>

    );

}

export default ItemCard;