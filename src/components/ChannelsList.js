import * as React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { ServersContext } from '../contexts/ServersContext';
import { useContext } from "react";
import './List.css';
import axios from "axios"
import socket from '../socket';

function ChannelsList({ serverId, isOwner, channels }) {
    const { setServers } = useContext(ServersContext);
    const [channelName, setChannelName] = React.useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (channelName === "") return;

        axios.post("/channels/", { name: channelName, serverId: serverId })
            .then((channel) => {
                axios.get("/loggeduser/servers")
                    .then(servers => {
                        setServers(servers.data);
                        socket.emit("join_room", channel.data.id);
                        socket.emit("action", { room: serverId, action: "channel_created", channelId: channel.data.id });
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
                        socket.emit("action", { room: serverId, action: "channel_deleted", channelId: channelId });
                    });
            });
    };

    const deleteServer = () => {
        axios.delete("/servers/" + serverId + "/delete")
            .then(() => {
                axios.get("/loggeduser/servers")
                    .then(servers => {
                        navigate("/", { replace: true });
                        setServers(servers.data);
                        socket.emit("leave_room", serverId);
                        socket.emit("action", { room: serverId, action: "server_deleted" });
                    });
            });
    };

    const leaveServer = () => {
        axios.delete("/loggeduser/" + serverId + "/" + leaveServer)
            .then(() => {
                axios.get("/loggeduser/servers")
                    .then(servers => {
                        navigate("/", { replace: true });
                        setServers(servers.data);
                        socket.emit("leave_room", serverId);
                    });
            });
    };

    return (
        <div style={{ backgroundColor: "#2B3180", minWidth: "200px", maxWidth: "200px", overflowY: "auto" }}>
            <ul className='list'>
                <li><NavLink style={({ isActive }) => ({
                    color: isActive ? '#E95B0D' : "inherit"
                })} to={"/channels/" + serverId} end>About server</NavLink></li>
                <li>&nbsp;</li>
                <li><b>CHANNELS</b></li>
                <li>&nbsp;</li>
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
                <li>&nbsp;</li>
                {channels.map((channel) => {
                    return (
                        <li key={channel.id}>
                            <NavLink style={({ isActive }) => ({
                                color: isActive ? '#E95B0D' : "inherit"
                            })} to={"/channels/" + serverId + "/" + channel.id}>{channel.name}</NavLink>
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