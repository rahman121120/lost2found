import { useEffect, useState } from "react";
import api from "../../services/api";
import "./FoundItems.css";
import ItemCard from "../../components/cards/ItemCard";

function FoundItems() {

    const [items, setItems] = useState([]);

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

            setItems(response.data);

        } catch (error) {

            console.log(error);

        }

    }

    return (

        <div>

            <h1 style={{ marginBottom: "30px" }}>

                Found Items

            </h1>

            <div className="item-grid">

                {

                    items.map(item => (

                        <ItemCard
                            key={item.id}
                            item={item}
                        />

                    ))

                }

            </div>

        </div>

    );

}

export default FoundItems;