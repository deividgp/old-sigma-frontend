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
    const [channels, setChannels] = useState([]);
    const [members, setMembers] = useState([]);
    const [description, setDescription] = useState("");
    const [isOwner, setIsOwner] = useState(false);
    const { servers } = useContext(ServersContext);
    const { user } = useContext(UserContext);
    const [server, setServer] = useState();

    useEffect(() => {
        axios.get("/servers/" + serverId + "/users")
            .then(res => {
                setMembers(res.data);
            })
        const serverAux = servers.find(server => server.id === serverId);
        setServer(serverAux);
        setIsOwner(serverAux.OwnerId === user.id);
        setChannels(serverAux.Channels);
        setDescription(serverAux.description);
    }, [serverId, servers, user]);

    return (
        <div style={{ display: "flex", height: "100%" }}>
            <ChannelsList serverId={serverId} isOwner={isOwner} channels={channels} />
            <Outlet context={description} />
            <MembersList server={server} isOwner={isOwner} members={members} />
        </div>
    );
}

export default Server;