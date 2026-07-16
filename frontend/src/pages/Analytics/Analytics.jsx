import { useEffect, useState } from "react";
import api from "../../services/api";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import "./Analytics.css";

function Analytics() {

    const [analytics, setAnalytics] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadAnalytics();

    }, []);

    async function loadAnalytics() {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/analytics",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setAnalytics(response.data);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    }

    if (loading) {

        return <LoadingSpinner />;

    }

    return (

        <div className="analytics-page">

            <h1 className="analytics-title">

                📊 Analytics Dashboard

            </h1>

            <div className="analytics-grid">

                <div className="analytics-card">

                    <h3>Total Lost Items</h3>

                    <h2>

                        {analytics.totalLostItems}

                    </h2>

                </div>

                <div className="analytics-card">

                    <h3>Total Found Items</h3>

                    <h2>

                        {analytics.totalFoundItems}

                    </h2>

                </div>

                <div className="analytics-card">

                    <h3>Returned Items</h3>

                    <h2>

                        {analytics.returnedItems}

                    </h2>

                </div>

                <div className="analytics-card">

                    <h3>Recovery Rate</h3>

                    <h2>

                        {analytics.recoveryRate.toFixed(1)}%

                    </h2>

                </div>

            </div>

            <div className="analytics-section">

                <h2>

                    Lost Items by Category

                </h2>

                {

                    Object.keys(analytics.lostByCategory).length === 0 ? (

                        <p className="empty-text">

                            No data available.

                        </p>

                    ) : (

                        Object.entries(
                            analytics.lostByCategory
                        ).map(([category, count]) => (

                            <div
                                key={category}
                                className="category-row"
                            >

                                <div className="category-header">

                                    <span>

                                        {category}

                                    </span>

                                    <span>

                                        {count}

                                    </span>

                                </div>

                                <div className="progress">

                                    <div
                                        className="progress-fill lost"
                                        style={{
                                            width: `${Math.min(
                                                count * 10,
                                                100
                                            )}%`
                                        }}
                                    ></div>

                                </div>

                            </div>

                        ))

                    )

                }

            </div>

            <div className="analytics-section">

                <h2>

                    Found Items by Category

                </h2>

                {

                    Object.keys(analytics.foundByCategory).length === 0 ? (

                        <p className="empty-text">

                            No data available.

                        </p>

                    ) : (

                        Object.entries(
                            analytics.foundByCategory
                        ).map(([category, count]) => (

                            <div
                                key={category}
                                className="category-row"
                            >

                                <div className="category-header">

                                    <span>

                                        {category}

                                    </span>

                                    <span>

                                        {count}

                                    </span>

                                </div>

                                <div className="progress">

                                    <div
                                        className="progress-fill found"
                                        style={{
                                            width: `${Math.min(
                                                count * 10,
                                                100
                                            )}%`
                                        }}
                                    ></div>

                                </div>

                            </div>

                        ))

                    )

                }

            </div>

        </div>

    );

}

export default Analytics;