import { Outlet } from "react-router-dom";
import FriendsList from "../components/FriendsList";

function Private() {
    return (
        <div style={{display: "flex", height: "100%"}}>
            <div style={{backgroundColor: "#2B3180", minWidth: "200px", maxWidth: "200px", height: "100%", overflowY: "auto"}}>
                <FriendsList />
            </div>
            <Outlet/>
        </div>
    );
}

export default Private;