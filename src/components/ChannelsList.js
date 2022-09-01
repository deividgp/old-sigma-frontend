import * as React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { ServersContext } from '../contexts/ServersContext';
import { useContext } from "react";
import './List.css';
import axios from "../axios";
import socket from '../socket';

function ChannelsList({ isOwner, channels, rooms }) {
    const { setServers } = useContext(ServersContext);
    const [channelName, setChannelName] = React.useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (channelName === "") return;

        axios.post("/channels/", { name: channelName, serverId: rooms[0] })
            .then((channel) => {
                axios.get("/loggeduser/servers")
                    .then(servers => {
                        setServers(servers.data);
                        socket.emit("join_room", channel.data.id);
                        socket.emit("action", { room: rooms[0], action: "channel_created", channelId: channel.data.id });
                    });
            });
        setChannelName("");
    }

    const deleteChannel = (channelId) => {
        axios.delete("/channels/" + channelId)
            .then(() => {
                axios.get("/loggeduser/servers")
                    .then(servers => {
                        setServers(servers.data);
                        socket.emit("leave_room", channelId);
                        socket.emit("action", { room: rooms[0], action: "channel_deleted", channelId: channelId });
                    });
            });
    };

    const deleteServer = () => {
        axios.delete("/servers/" + rooms[0] + "/delete")
            .then(() => {
                axios.get("/loggeduser/servers")
                    .then(servers => {
                        navigate("/", { replace: true });
                        setServers(servers.data);
                        socket.emit("leave_room", rooms);
                        socket.emit("action", { room: rooms[0], action: "server_deleted", rooms: rooms });
                    });
            });
    };

    const leaveServer = () => {
        axios.delete("/loggeduser/" + rooms[0] + "/leaveServer")
            .then(() => {
                axios.get("/loggeduser/servers")
                    .then(servers => {
                        navigate("/", { replace: true });
                        setServers(servers.data);
                        socket.emit("leave_room", rooms);
                    });
            });
    };

    return (
        <div style={{ backgroundColor: "#2B3180", minWidth: "200px", maxWidth: "200px", overflowY: "auto" }}>
            <ul className='list'>
                <li><NavLink style={({ isActive }) => ({
                    color: isActive ? '#E95B0D' : "inherit"
                })} to={"/channels/" + rooms[0]} end>About server</NavLink></li>
                <li>&nbsp;</li>
                <li><b>CHANNELS</b></li>
                <li>&nbsp;</li>
                {
                    isOwner
                        ?
                        (
                            <li>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        style={{ width: "75px" }}
                                        type="text"
                                        value={channelName}
                                        onChange={(e) => setChannelName(e.target.value)}
                                    />
                                    <input type="submit" value={"Add channel"} />
                                </form>
                            </li>
                        )
                        :
                        ""
                }
                {channels.map((channel) => {
                    return (
                        <li key={channel.id}>
                            <NavLink style={({ isActive }) => ({
                                color: isActive ? '#E95B0D' : "inherit"
                            })} to={"/channels/" + rooms[0] + "/" + channel.id}>{channel.name}</NavLink>
                            &nbsp;
                            {
                                isOwner
                                    ?
                                    (<button onClick={() => deleteChannel(channel.id)}>Delete</button>)
                                    :
                                    ""
                            }
                        </li>
                    )
                })}
            </ul>

            <div style={{ width: "50%", margin: "0 auto" }}>
                {
                    isOwner
                        ?
                        (
                            <button onClick={deleteServer}>Delete server</button>
                        )
                        :
                        (
                            <button onClick={leaveServer}>Leave server</button>
                        )
                }
            </div>
        </div>
    );
}

export default ChannelsList;