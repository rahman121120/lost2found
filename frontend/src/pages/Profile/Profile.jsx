import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Profile.css";
import defaultProfile from "../../assets/default-profile.png";

function Profile() {

    const [user, setUser] = useState({});

    useEffect(() => {

        async function loadProfile() {

            const token = localStorage.getItem("token");

            const response = await api.get("/users/profile", {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            setUser(response.data);

        }

        loadProfile();

    }, []);

    return (

        <div className="profile-page">

            <div className="profile-card">

               <img
    src={
    user.profileImage &&
    user.profileImage.trim() !== "" &&
    user.profileImage !== "profile.jpg"
        ? `http://localhost:8080/${user.profileImage}`
        : defaultProfile
}
    alt="Profile"
/>

                <h2>{user.name}</h2>

                <span>{user.department}</span>

                <div className="info">

                    <p><b>Email</b></p>
                    <p>{user.email}</p>

                    <p><b>Phone</b></p>
                    <p>{user.phone}</p>

                    <p><b>Year</b></p>
                    <p>{user.year}</p>

                </div>

                <button>Edit Profile</button>

            </div>

        </div>

    );

}

export default Profile;