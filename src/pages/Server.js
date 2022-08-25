import { Outlet } from "react-router-dom";
import ChannelsList from "../components/ChannelsList";
import MembersList from "../components/MembersList";
import { useParams } from 'react-router-dom';

function Server() {
    const { serverId } = useParams();

    return (
        <div style={{display: "flex", height: "100%"}}>
            <ChannelsList serverId={serverId} />
                <Outlet context={serverId} />
            <MembersList/>
        </div>
    );
}

export default Server;