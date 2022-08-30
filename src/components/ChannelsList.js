import * as React from 'react';
import { Link, NavLink } from "react-router-dom";
import { ServersContext } from '../contexts/ServersContext';
import { useContext } from "react";
import './List.css';

function ChannelsList({ serverId, isOwner }) {
    const [channels, setChannels] = React.useState([]);
    const { servers } = useContext(ServersContext);

    React.useEffect(() => {
        const serverAux = servers.find(server => server.id === serverId);
        setChannels(serverAux.Channels);
    }, [serverId]);

    return (
        <div style={{ backgroundColor: "#2B3180", minWidth: "200px", maxWidth: "200px", overflowY: "auto" }}>
            <ul className='list'>
                <li><NavLink style={({ isActive }) => ({
                    color: isActive ? '#E95B0D' : "inherit"
                })} to={"/channels/" + serverId} end>About server</NavLink></li>
                <li>&nbsp;</li>
                <li><b>CHANNELS</b></li>
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
                                    (<button>Delete</button>)
                                    :
                                    ""
                            }
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default ChannelsList;