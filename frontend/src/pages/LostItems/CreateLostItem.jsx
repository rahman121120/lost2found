import { useState } from "react";
import api from "../../services/api";

function CreateLostItem() {

    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        location: "",
        latitude: "",
        longitude: "",
        reward: "",
        image: ""
    });

    const [selectedFile, setSelectedFile] = useState(null);

    function change(e) {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    }

    async function submit(e) {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            let uploadedImage = "";

            // Upload image first
            if (selectedFile) {

                const formData = new FormData();

                formData.append("file", selectedFile);

                const uploadResponse = await api.post(

                    "/files/upload",

                    formData,

                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }

                );

                uploadedImage = uploadResponse.data.fileName;

            }

            // Save Lost Item
            await api.post(

                "/items",

                {
                    ...form,
                    image: uploadedImage
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            alert("Lost Item Posted Successfully");

            window.location.href = "/lost-items";

        } catch (err) {

            console.log(err);

            alert("Failed to create lost item.");

        }

    }

    return (

        <form
            onSubmit={submit}
            style={{
                background: "white",
                padding: "30px",
                borderRadius: "15px",
                marginBottom: "30px",
                display: "flex",
                flexDirection: "column",
                gap: "15px"
            }}
        >

            <h2>Post Lost Item</h2>

            <input
                name="title"
                placeholder="Title"
                onChange={change}
            />

            <input
                name="category"
                placeholder="Category"
                onChange={change}
            />

            <input
                name="location"
                placeholder="Location"
                onChange={change}
            />

            <input
                name="reward"
                placeholder="Reward"
                onChange={change}
            />

            <textarea
                name="description"
                placeholder="Description"
                onChange={change}
            />

            <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files[0])}
            />

            <button
                style={{
                    padding: "14px",
                    background: "#2563EB",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer"
                }}
            >
                Post Item
            </button>

        </form>

    );

}

export default CreateLostItem;