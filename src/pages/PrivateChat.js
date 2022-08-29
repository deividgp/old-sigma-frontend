import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Chat from "../components/Chat";
import { ActiveContext } from "../contexts/ActiveContext";

function PrivateChat() {
    const { userId } = useParams();
    const { active, setActive } = useContext(ActiveContext);

    useEffect(() => {
        setActive(userId);
        console.log(userId);
        console.log(active);

        return () => {
            console.log('Child unmounted');
            setActive(null);
        };
    }, [userId]);

    return (
        <Chat/>
    );
}

export default PrivateChat;
