import { Outlet } from "react-router-dom";
import ChannelsList from "../components/ChannelsList";
import MembersList from "../components/MembersList";
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ServersContext } from '../contexts/ServersContext';
import { UserContext } from "../contexts/UserContext";

function Server() {
    const { serverId } = useParams();
    const [members, setMembers] = useState([]);
    const [isOwner, setIsOwner] = useState(false);
    const { servers } = useContext(ServersContext);
    const { user } = useContext(UserContext);

    useEffect(() => {
        axios.get("/servers/" + serverId + "/users")
            .then(res => {
                console.log(res.data);
                setMembers(res.data);
            })
        const serverAux = servers.find(server => server.id === serverId);
        setIsOwner(serverAux.OwnerId === user.id);
    }, [serverId]);

    return (
        <div style={{ display: "flex", height: "100%" }}>
            <ChannelsList serverId={serverId} isOwner={isOwner} />
            <Outlet context={serverId} />
            <MembersList members={members} isOwner={isOwner} />
        </div>
    );
}

export default Server;