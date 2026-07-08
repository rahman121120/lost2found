import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "./ItemDetails.css";

function ItemDetails() {

    const { id } = useParams();

    const [item, setItem] = useState(null);

    const [message, setMessage] = useState("");

    const [claims, setClaims] = useState([]);

    useEffect(() => {

        loadItem();
        loadClaims();

    }, []);

    async function loadItem() {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(`/items/${id}`, {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            setItem(response.data);

        } catch (error) {

            console.log(error);

        }

    }

    async function loadClaims() {

    try {

        const token = localStorage.getItem("token");

        const response = await api.get(

            `/claims/item/${id}`,

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        setClaims(response.data);

    } catch (error) {

        console.log(error);

    }

}

async function approveClaim(id){

try{

const token=localStorage.getItem("token");

await api.put(

`/claims/${id}/approve`,

{},

{

headers:{

Authorization:`Bearer ${token}`

}

}

);

alert("Claim Approved");

loadClaims();

loadItem();

}catch(err){

console.log(err);

}

}

async function rejectClaim(id){

try{

const token=localStorage.getItem("token");

await api.put(

`/claims/${id}/reject`,

{},

{

headers:{

Authorization:`Bearer ${token}`

}

}

);

alert("Claim Rejected");

loadClaims();

}catch(err){

console.log(err);

}

}

async function confirmClaim(id){

try{

const token=localStorage.getItem("token");

await api.put(

`/claims/${id}/confirm`,

{},

{

headers:{

Authorization:`Bearer ${token}`

}

}

);

alert("Item Returned Successfully");

loadClaims();

loadItem();

}catch(err){

console.log(err);

alert("Failed");

}

}
    
    async function claimItem() {

    try {

        const token = localStorage.getItem("token");

        const response = await api.post(

            "/claims",

            {

                lostItemId: item.id,

                message: message

            },

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        alert(response.data);

    } catch (error) {

        console.log(error);

        alert("Unable to submit claim");

    }

}

    if (!item) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="details-container">

           <img
    src={
        item.image
            ? `http://localhost:8080/uploads/${item.image}`
            : "https://placehold.co/600x400?text=No+Image"
    }
    alt={item.title}
/>

            <div className="details-content">

                <h1>{item.title}</h1>

                <p><b>Category:</b> {item.category}</p>

                <p><b>Location:</b> {item.location}</p>

                <p><b>Description:</b> {item.description}</p>

                <p><b>Reward:</b> ₹{item.reward}</p>

                <p><b>Status:</b> {item.status}</p>

                <textarea

placeholder="Why does this item belong to you?"

value={message}

onChange={(e)=>setMessage(e.target.value)}

style={{

width:"100%",

height:"120px",

marginTop:"25px",

padding:"15px",

borderRadius:"10px"

}}

/>

<button

style={{marginTop:"20px"}}

onClick={claimItem}

>

Submit Claim

</button>

<hr style={{margin:"40px 0"}} />

<h2>

Claims

</h2>

{

claims.map(claim=>(

<div

key={claim.id}

style={{

background:"#fff",

padding:"20px",

marginTop:"15px",

borderRadius:"10px",

boxShadow:"0 3px 10px rgba(0,0,0,.08)"

}}

>

<h3>{claim.claimant.name}</h3>

<p>{claim.message}</p>

<p>

Status :

<b>{claim.status}</b>

</p>

{
claim.status === "PENDING" && (

<div
style={{
display:"flex",
gap:"12px",
marginTop:"15px"
}}
>

<button
onClick={() => approveClaim(claim.id)}
style={{
background:"#16a34a",
color:"white",
border:"none",
padding:"10px 18px",
borderRadius:"8px",
cursor:"pointer"
}}
>
Approve
</button>

<button
onClick={() => rejectClaim(claim.id)}
style={{
background:"#dc2626",
color:"white",
border:"none",
padding:"10px 18px",
borderRadius:"8px",
cursor:"pointer"
}}
>
Reject
</button>

</div>

)
}
{
claim.status === "APPROVED" &&(

<button
onClick={() => confirmClaim(claim.id)}
style={{
marginTop:"15px",
background:"#2563eb",
color:"white",
border:"none",
padding:"10px 20px",
borderRadius:"8px",
cursor:"pointer"
}}
>

Confirm Return

</button>

)
}

</div>

))

}

            </div>

        </div>

    );

}

export default ItemDetails;