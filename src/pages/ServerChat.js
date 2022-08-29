//import './ServerChat.css';

import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Chat from "../components/Chat";
import { ActiveContext } from "../contexts/ActiveContext";

function ServerChat() {
    const { channelId } = useParams();
    const { active, setActive } = useContext(ActiveContext);

    useEffect(() => {
        setActive(channelId);
        console.log(active);
        
        return () => {
            console.log('Child unmounted');
            setActive(null);
        };
    }, [channelId]);

    return (
        <Chat></Chat>
    );
}

export default ServerChat;
