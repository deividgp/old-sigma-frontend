import { useOutletContext } from "react-router-dom";
import * as React from 'react';
import { ServersContext } from '../contexts/ServersContext';
import { useContext } from "react";

function AboutServer() {
    const serverId = useOutletContext();
    const [description, setDescription] = React.useState("");
    const { servers } = useContext(ServersContext);

    React.useEffect(() => {
        const serverAux = servers.find(server => server.id === serverId);
        setDescription(serverAux.description);
    }, [serverId]);

    return (
        <div style={{backgroundColor: "#613d5f", height: "100%", overflowY: "auto", flexGrow: "1"}}>
            {description}
        </div>
    );
}

export default AboutServer;