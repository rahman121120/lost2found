import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./CreateLostItem.css";

function CreateLostItem() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [reward, setReward] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [image, setImage] = useState("");

    async function submitItem() {

        try {

            const token = localStorage.getItem("token");

            let uploadedImage = image;

            // Upload image first
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

            // Create lost item
            await api.post(
                "/items",
                {
                    title,
                    description,
                    category,
                    location,
                    reward,
                    image: uploadedImage
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Lost Item Posted Successfully");

            navigate("/lost-items");

        } catch (err) {

            console.log(err);

            alert("Failed to create lost item");

        }

    }

    return (

        <div className="create-item">

            <h1>Report Lost Item</h1>

            <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <input
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            <input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />

            <input
                placeholder="Reward"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
            />

            <h3 style={{ marginTop: "20px" }}>
                Upload Image
            </h3>

            <input
                type="file"
                accept="image/*"
                onChange={(e) => {

                    const file = e.target.files[0];

                    if (!file) return;

                    setSelectedFile(file);

                    setPreview(URL.createObjectURL(file));

                }}
            />

            {preview && (

                <img
                    src={preview}
                    alt="Preview"
                    style={{
                        width: "250px",
                        marginTop: "20px",
                        borderRadius: "12px"
                    }}
                />

            )}

            <button
                style={{ marginTop: "25px" }}
                onClick={submitItem}
            >
                Submit
            </button>

        </div>

    );

}

export default CreateLostItem;