import "./MainLayout.css";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";


function MainLayout({ children }) {

    return (

        <div className="layout">

            <Sidebar />

            <div className="main">

                <Topbar />

                <div className="content">

                    {children}

                </div>

            </div>

        </div>

    );

}

export default MainLayout;