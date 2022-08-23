import { Outlet } from "react-router-dom";
import ChannelsList from "../components/ChannelsList";
import MembersList from "../components/MembersList";

function Server() {
    return (
        <div style={{display: "flex", height: "100%"}}>
            <ChannelsList/>
            <Outlet/>
            <MembersList/>
        </div>
    );
}

export default Server;