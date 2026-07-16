import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./GlobalSearch.css";

function GlobalSearch() {

    const navigate = useNavigate();

    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {

        const timeout = setTimeout(() => {

            if (keyword.trim().length > 0) {

                searchItems();

            } else {

                setResults([]);
                setShowResults(false);

            }

        }, 300);

        return () => clearTimeout(timeout);

    }, [keyword]);

    async function searchItems() {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(

                `/search?keyword=${keyword}`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setResults(response.data);
            setShowResults(true);

        } catch (err) {

            console.error(err);

        }

    }

    function openResult(item) {

        setKeyword("");
        setShowResults(false);

        if (item.type === "LOST") {

            navigate(`/items/${item.id}`);

        } else {

            navigate(`/found-items/${item.id}`);

        }

    }

    return (

        <div className="global-search">

            <input
                type="text"
                placeholder="🔍 Search Lost & Found..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />

            {

                showResults && (

                    <div className="search-results">

                        {

                            results.length === 0 ? (

                                <div className="no-result">

                                    No matching items found

                                </div>

                            ) : (

                                results.map(item => (

                                    <div
                                        key={`${item.type}-${item.id}`}
                                        className="search-item"
                                        onClick={() => openResult(item)}
                                    >

                                        <img
                                            src={
                                                item.image
                                                    ? `http://localhost:8080/uploads/${item.image}`
                                                    : "https://placehold.co/60x60?text=Item"
                                            }
                                            alt={item.title}
                                        />

                                        <div className="search-info">

                                            <h4>

                                                {item.title}

                                            </h4>

                                            <span
                                                className={
                                                    item.type === "LOST"
                                                        ? "lost-badge"
                                                        : "found-badge"
                                                }
                                            >

                                                {item.type}

                                            </span>

                                            <p>

                                                📍 {item.location}

                                            </p>

                                        </div>

                                    </div>

                                ))

                            )

                        }

                    </div>

                )

            }

        </div>

    );

}

export default GlobalSearch;