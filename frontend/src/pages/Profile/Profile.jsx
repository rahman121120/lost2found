import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import "./Profile.css";
import defaultProfile from "../../assets/default-profile.png";
import LoadingSpinner from "../../components/common/LoadingSpinner";

function Profile() {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/users/profile", {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            setUser(response.data);

        } catch (error) {

            console.error(error);
            toast.error("Unable to load profile");

        } finally {

            setLoading(false);

        }

    }

    async function saveProfile() {

        try {

            const token = localStorage.getItem("token");

            await api.put(
                "/users/profile",
                user,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Profile Updated Successfully");

            setEditing(false);

            localStorage.setItem("userName", user.name);

        } catch (error) {

            console.error(error);
            toast.error("Unable to update profile");

        }

    }

    function handleChange(e) {

        setUser({

            ...user,

            [e.target.name]: e.target.value

        });

    }

    if (loading) {

        return <LoadingSpinner />;

    }

    return (

        <div className="profile-page">

            <div className="profile-card">

                <img
                    src={
                        user.profileImage &&
                        user.profileImage.trim() !== "" &&
                        user.profileImage !== "profile.jpg"
                            ? `http://localhost:8080/uploads/${user.profileImage}`
                            : defaultProfile
                    }
                    alt="Profile"
                />

                {
                    editing ? (

                        <input
                            name="name"
                            value={user.name || ""}
                            onChange={handleChange}
                        />

                    ) : (

                        <h2>{user.name || "Student"}</h2>

                    )
                }

                <span className="profile-role">

                    {user.role || "Student"}

                </span>

                <div className="info">

                    <div>

                        <strong>📧 Email</strong>

                        <p>{user.email || "-"}</p>

                    </div>

                    <div>

                        <strong>📱 Phone</strong>

                        {

                            editing

                                ?

                                <input
                                    name="phone"
                                    value={user.phone || ""}
                                    onChange={handleChange}
                                />

                                :

                                <p>{user.phone || "-"}</p>

                        }

                    </div>

                    <div>

                        <strong>🏫 Department</strong>

                        {

                            editing

                                ?

                                <input
                                    name="department"
                                    value={user.department || ""}
                                    onChange={handleChange}
                                />

                                :

                                <p>{user.department || "-"}</p>

                        }

                    </div>

                    <div>

                        <strong>🎓 Year</strong>

                        {

                            editing

                                ?

                                <input
                                    name="year"
                                    value={user.year || ""}
                                    onChange={handleChange}
                                />

                                :

                                <p>{user.year || "-"}</p>

                        }

                    </div>

                </div>

                <div className="profile-actions">

                    {

                        editing

                            ?

                            <>

                                <button
                                    onClick={saveProfile}
                                >

                                    Save

                                </button>

                                <button
                                    onClick={() => {

                                        setEditing(false);

                                        loadProfile();

                                    }}
                                >

                                    Cancel

                                </button>

                            </>

                            :

                            <button
                                onClick={() => setEditing(true)}
                            >

                                Edit Profile

                            </button>

                    }

                </div>

            </div>

        </div>

    );

}

export default Profile;