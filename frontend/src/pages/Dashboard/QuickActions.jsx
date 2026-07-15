import "./QuickActions.css";
import { useNavigate } from "react-router-dom";

function QuickActions(){

const navigate=useNavigate();

return(

<div className="quick-grid">

<div
className="quick-card"
onClick={()=>navigate("/create-lost-item")}
>

<div className="quick-icon">

📦

</div>

<h3>

Report Lost Item

</h3>

<p>

Create a new lost item report.

</p>

</div>

<div
className="quick-card"
onClick={()=>navigate("/create-found-item")}
>

<div className="quick-icon">

🎒

</div>

<h3>

Report Found Item

</h3>

<p>

Help someone recover belongings.

</p>

</div>

</div>

);

}

export default QuickActions;