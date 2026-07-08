import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Dashboard.css";
import StatCard from "../../components/cards/StatCard";

function Dashboard() {

    const [dashboard, setDashboard] = useState({
        myItems:0,
        myClaims:0,
        approvedClaims:0,
        pendingClaims:0
    });

    useEffect(()=>{

        async function loadDashboard(){

            try{

                const token=localStorage.getItem("token");

                const res=await api.get("/dashboard",{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });

                setDashboard(res.data);

            }catch(err){

                console.log(err);

            }

        }

        loadDashboard();

    },[]);

    return(

        <div className="dashboard">

            <div className="welcome">

               <h1>

Welcome back,

{localStorage.getItem("userName") || "Student"} 👋

</h1>

                <p>Lost2Found Dashboard</p>

            </div>

            <div className="dashboard-grid">

                <StatCard
                    title="My Lost Items"
                    value={dashboard.myItems}
                />

                <StatCard
                    title="My Claims"
                    value={dashboard.myClaims}
                />

                <StatCard
                    title="Approved"
                    value={dashboard.approvedClaims}
                />

                <StatCard
                    title="Pending"
                    value={dashboard.pendingClaims}
                />

            </div>

        </div>

    );

}

export default Dashboard;