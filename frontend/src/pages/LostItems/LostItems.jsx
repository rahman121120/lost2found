import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import ItemCard from "../../components/cards/ItemCard";

function LostItems() {

    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        loadItems();

    }, []);

    async function loadItems() {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get("/items", {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            setItems(res.data);

        } catch (error) {

            console.log(error);

        }

    }

    return (

        <>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "25px"
                }}
            >

                <h1>Lost Items</h1>

                <button
                    onClick={() => navigate("/create-lost-item")}
                    style={{
                        background: "#2563EB",
                        color: "white",
                        border: "none",
                        padding: "12px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    + Report Lost Item
                </button>

            </div>

            <input
                type="text"
                placeholder="🔍 Search lost items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                    marginBottom: "25px",
                    fontSize: "16px"
                }}
            />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
                    gap: "25px"
                }}
            >

                {
                    items
                        .filter(item =>
                            item.title.toLowerCase().includes(search.toLowerCase())
                        )
                        .map(item => (

                            <ItemCard
                                key={item.id}
                                item={item}
                            />

                        ))
                }

            </div>

        </>

    );

}

export default LostItems;