import { Outlet } from "react-router-dom";
import ChannelsList from "../components/ChannelsList";
import MembersList from "../components/MembersList";

function Server() {
    return (
        <div style={{display: "flex"}}>
            <ChannelsList/>
            <Outlet/>
            <MembersList/>
        </div>
    );
}

export default Server;