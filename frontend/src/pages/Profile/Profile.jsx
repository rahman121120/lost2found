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

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState("");

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

        } catch (err) {

            console.error(err);
            toast.error("Unable to load profile");

        } finally {

            setLoading(false);

        }

    }

    function handleChange(e) {

        setUser({

            ...user,

            [e.target.name]: e.target.value

        });

    }

    async function saveProfile() {

        try {

            const token = localStorage.getItem("token");

            let uploadedImage = user.profileImage;

            // Upload profile image
            if (selectedFile) {

                const formData = new FormData();

                formData.append("file", selectedFile);

                const uploadResponse = await api.post(

                    "/files/upload",

                    formData,

                    {

                        headers: {

                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"

                        }

                    }

                );

                uploadedImage = uploadResponse.data.fileName;

            }

            const payload = {

                ...user,

                profileImage: uploadedImage

            };

            const response = await api.put(

                "/users/profile",

                payload,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setUser(response.data);

            localStorage.setItem("userName", response.data.name);

            toast.success("Profile Updated Successfully");

            setEditing(false);

            setSelectedFile(null);

            setPreview("");

        }

        catch (err) {

            console.error(err);

            toast.error("Unable to update profile");

        }

    }

    if (loading) {

        return <LoadingSpinner />;

    }

    return (

        <div className="profile-page">

            <div className="profile-card">

                <img

                    src={

                        preview

                            ?

                            preview

                            :

                            user.profileImage

                                ?

                                `http://localhost:8080/uploads/${user.profileImage}`

                                :

                                defaultProfile

                    }

                    alt="Profile"

                    className="profile-image"

                />

                {

                    editing && (

                        <>

                            <input

                                type="file"

                                accept="image/*"

                                onChange={(e) => {

                                    const file = e.target.files[0];

                                    if (!file) return;

                                    setSelectedFile(file);

                                    setPreview(

                                        URL.createObjectURL(file)

                                    );

                                }}

                            />

                        </>

                    )

                }

                {

                    editing ?

                        (

                            <input

                                name="name"

                                value={user.name || ""}

                                onChange={handleChange}

                            />

                        )

                        :

                        (

                            <h2>

                                {user.name}

                            </h2>

                        )

                }

                <span className="profile-role">

                    Student

                </span>

                <div className="info">

                    <div>

                        <strong>Email</strong>

                        <p>

                            {user.email}

                        </p>

                    </div>

                    <div>

                        <strong>Phone</strong>

                        {

                            editing ?

                                (

                                    <input

                                        name="phone"

                                        value={user.phone || ""}

                                        onChange={handleChange}

                                    />

                                )

                                :

                                (

                                    <p>

                                        {user.phone || "-"}

                                    </p>

                                )

                        }

                    </div>

                    <div>

                        <strong>Department</strong>

                        {

                            editing ?

                                (

                                    <input

                                        name="department"

                                        value={user.department || ""}

                                        onChange={handleChange}

                                    />

                                )

                                :

                                (

                                    <p>

                                        {user.department || "-"}

                                    </p>

                                )

                        }

                    </div>

                    <div>

                        <strong>Year</strong>

                        {

                            editing ?

                                (

                                    <input

                                        name="year"

                                        value={user.year || ""}

                                        onChange={handleChange}

                                    />

                                )

                                :

                                (

                                    <p>

                                        {user.year || "-"}

                                    </p>

                                )

                        }

                    </div>

                </div>

                <div className="profile-actions">

                    {

                        editing ?

                            <>

                                <button

                                    onClick={saveProfile}

                                >

                                    Save Changes

                                </button>

                                <button

                                    onClick={() => {

                                        setEditing(false);

                                        setPreview("");

                                        setSelectedFile(null);

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