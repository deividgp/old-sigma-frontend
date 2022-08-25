import * as React from 'react';
import { Link } from "react-router-dom";
import { ServersContext } from '../contexts/ServersContext';
import { useContext } from "react";
import './List.css';

function ChannelsList(props) {
    const serverId = props.serverId;
    const [channels, setChannels] = React.useState([]);
    const { servers } = useContext(ServersContext);

    React.useEffect(() => {
        const serverAux = servers.find(server => server.id === serverId);
        setChannels(serverAux.Channels);
    }, [serverId]);

    return (
        <div style={{backgroundColor: "#2B3180", minWidth: "200px", maxWidth: "200px", overflowY: "auto"}}>
            <ul className='list'>
                <li><Link to={"/channels/"+serverId}>About server</Link></li>
                {channels.map((channel) => {
                    return (
                        <li key={channel.id}>
                        <Link to={"/channels/"+serverId+"/"+channel.id}>{channel.name}</Link>
                        </li> 
                    )
                })}
            </ul>
        </div>
    );
}

export default ChannelsList;