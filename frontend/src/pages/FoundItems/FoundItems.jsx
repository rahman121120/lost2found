import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import ItemCard from "../../components/cards/ItemCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import toast from "react-hot-toast";
import "./FoundItems.css";
import "../../styles/EmptyState.css";

function FoundItems() {

    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadItems();

    }, []);

    async function loadItems() {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/found-items", {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            // Newest first
            const sortedItems = [...response.data].sort(
                (a, b) => b.id - a.id
            );

            setItems(sortedItems);

        } catch (error) {

            console.error(error);

            toast.error("Unable to load found items");

        } finally {

            setLoading(false);

        }

    }

    const filteredItems = items.filter(item => {

        const keyword = search.toLowerCase();

        return (
            item.title?.toLowerCase().includes(keyword) ||
            item.category?.toLowerCase().includes(keyword) ||
            item.location?.toLowerCase().includes(keyword)
        );

    });

    if (loading) {

        return <LoadingSpinner />;

    }

    return (

        <div className="page-container">

            <div className="page-header">

                <div>

                    <h1 className="page-title">

                        Found Items

                    </h1>

                    <p
                        style={{
                            color: "#666",
                            marginTop: "6px"
                        }}
                    >

                        {filteredItems.length} item(s) available

                    </p>

                </div>

                <button
                    className="report-btn"
                    onClick={() => navigate("/create-found-item")}
                >

                    + Report Found Item

                </button>

            </div>

            <input
                className="search-box"
                type="text"
                placeholder="🔍 Search by title, category or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {

                filteredItems.length === 0 ? (

                    <div className="empty-state">

                        <h2>🎒</h2>

                        <h3>No Found Items</h3>

                        <p>

                            No matching found items were found.
                            Try another search or report a found item.

                        </p>

                    </div>

                ) : (

                    <div className="item-grid">

                        {

                            filteredItems.map(item => (

                                <ItemCard
                                    key={item.id}
                                    item={item}
                                    type="found"
                                />

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}

export default FoundItems;