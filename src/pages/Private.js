import { Outlet } from "react-router-dom";
import PrivateChatsList from "../components/PrivateChatsList";

function Private() {
    return (
        <div style={{display: "flex", height: "100%"}}>
            <PrivateChatsList/>
            <Outlet/>
        </div>
    );
}

export default Private;