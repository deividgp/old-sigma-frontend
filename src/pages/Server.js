import { Outlet } from "react-router-dom";
import ChannelsList from "../components/ChannelsList";
import MembersList from "../components/MembersList";
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import axios from "../axios";
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
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        axios.get("/servers/" + serverId + "/users")
            .then(res => {
                setMembers(res.data);
            })
        const serverAux = servers.find(server => server.id === serverId);
        const rooms = [];
        rooms.push(serverAux.id);
        serverAux.Channels.forEach((channel) => {
            rooms.push(channel.id);
        });
        setRooms(rooms);
        setIsOwner(serverAux.OwnerId === user.id);
        setChannels(serverAux.Channels);
        setDescription(serverAux.description);
    }, [serverId, servers, user]);

    return (
        <div style={{ display: "flex", height: "100%" }}>
            <ChannelsList isOwner={isOwner} channels={channels} rooms={rooms} />
            <Outlet context={description} />
            <MembersList isOwner={isOwner} members={members} setMembers={setMembers} rooms={rooms} />
        </div>
    );
}

export default Server;