import { Outlet } from "react-router-dom";
import DirectMessagesList from "../components/DirectMessagesList";

function Private() {
    return (
        <div style={{display: "flex"}}>
            <DirectMessagesList/>
            <Outlet/>
        </div>
    );
}

export default Private;