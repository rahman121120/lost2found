import { useEffect, useState } from "react";
import api from "../../services/api";

function Claims(){

const [claims,setClaims]=useState([]);

useEffect(()=>{

loadClaims();

},[]);

async function loadClaims(){

try{

const token=localStorage.getItem("token");

const res=await api.get("/claims",{

headers:{
Authorization:`Bearer ${token}`
}

});

setClaims(res.data);

}catch(err){

console.log(err);

}

}

return(

<div>

<h1 style={{marginBottom:"25px"}}>

My Claims

</h1>

{

claims.map(claim=>(

<div
key={claim.id}
style={{
background:"white",
padding:"25px",
borderRadius:"15px",
marginBottom:"20px",
boxShadow:"0 3px 12px rgba(0,0,0,.08)"
}}
>

<h2>{claim.lostItem.title}</h2>

<p>

Status :

<b>

{claim.status}

</b>

</p>

<p>

Owner :

{claim.lostItem.user.name}

</p>

</div>

))

}

</div>

);

}

export default Claims;