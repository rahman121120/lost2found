import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import ItemCard from "../../components/cards/ItemCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import "../../styles/EmptyState.css";
import "./LostItems.css";

function LostItems() {

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

            const response = await api.get("/items", {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            setItems(response.data);

        } catch (error) {

            console.error(error);

            toast.error("Unable to load lost items.");

        } finally {

            setLoading(false);

        }

    }

    const filteredItems = items.filter(item => {

        return (

            item.title &&
            item.title.toLowerCase().includes(search.toLowerCase())

        );

    });

    if (loading) {

        return <LoadingSpinner />;

    }

    return (

        <div className="page-container">

            <div className="page-header">

                <h1 className="page-title">

                    Lost Items

                </h1>

                <button
                    className="report-btn"
                    onClick={() => navigate("/create-lost-item")}
                >

                    + Report Lost Item

                </button>

            </div>

            <input
                className="search-box"
                type="text"
                placeholder="🔍 Search lost items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {

                filteredItems.length === 0 ? (

                    <div className="empty-state">

                        <h2>📦</h2>

                        <h3>No Lost Items Found</h3>

                        <p>

                            Try another search or report a lost item.

                        </p>

                    </div>

                ) : (

                    <div className="item-grid">

                        {

                            filteredItems.map(item => (

                                <ItemCard
                                    key={item.id}
                                    item={item}
                                    type="lost"
                                />

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}

export default LostItems;