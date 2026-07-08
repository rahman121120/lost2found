import "./Topbar.css";
import { FaBell, FaSearch } from "react-icons/fa";

function Topbar(){

return(

<div className="topbar">

<div>

<h2>

Lost2Found

</h2>

</div>

<div className="top-actions">

<div className="search">

<FaSearch/>

<input

placeholder="Search..."

/>

</div>

<FaBell/>

</div>

</div>

);

}

export default Topbar;