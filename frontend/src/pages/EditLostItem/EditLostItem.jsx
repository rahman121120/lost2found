import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

import "./EditLostItem.css";

import Button from "../../components/common/Button";
import LoadingSpinner from "../../components/common/LoadingSpinner";

function EditLostItem() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [reward, setReward] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [image, setImage] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadItem();

    }, []);

    async function loadItem() {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get(

                `/items/${id}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            setTitle(res.data.title);
            setDescription(res.data.description);
            setCategory(res.data.category);
            setLocation(res.data.location);
            setReward(res.data.reward);

            if (res.data.image) {

                setImage(res.data.image);

                setPreview(
                    `http://localhost:8080/uploads/${res.data.image}`
                );

            }

        } catch (err) {

            console.error(err);
            toast.error("Unable to load item");

        } finally {

            setLoading(false);

        }

    }

    async function updateItem() {

        try {

            const token = localStorage.getItem("token");

            let uploadedImage = image;

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

            await api.put(

                `/items/${id}`,

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

            toast.success("Lost Item Updated Successfully");

            navigate(`/items/${id}`);

        } catch (err) {

            console.error(err);

            toast.error("Unable to update item");

        }

    }

    if (loading) {

        return <LoadingSpinner />;

    }

    return (

        <div className="create-item">

            <h1 className="page-title">

                Edit Lost Item

            </h1>

            <input
                type="text"
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
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />

            <input
                type="number"
                placeholder="Reward"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
            />

            <h3 style={{ marginTop: "20px" }}>

                Update Image

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

            {

                preview && (

                    <img
                        src={preview}
                        alt="Preview"
                        style={{
                            width: "250px",
                            marginTop: "20px",
                            borderRadius: "12px"
                        }}
                    />

                )

            }

            <Button
                text="Update Item"
                icon="💾"
                type="primary"
                onClick={updateItem}
            />

        </div>

    );

}

export default EditLostItem;