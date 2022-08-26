import { Outlet } from "react-router-dom";
import ChannelsList from "../components/ChannelsList";
import MembersList from "../components/MembersList";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

function Server() {
    const { serverId } = useParams();
    const [ members, setMembers ] = useState([]);

    useEffect(() => {
        axios.get("/servers/"+serverId+"/users")
        .then(res => {
            setMembers(res.data);
        })
    }, [serverId]);

    return (
        <div style={{display: "flex", height: "100%"}}>
            <ChannelsList serverId={serverId} />
            <Outlet context={serverId} />
            <MembersList users={members} />
        </div>
    );
}

export default Server;