import './Chat.css';
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ActiveContext } from "../contexts/ActiveContext";
import socket from "../socket"

function PrivateChat() {
    const { userId } = useParams();
    const { setActive } = useContext(ActiveContext);
    const [ messages, setMessages ] = useState([]);
    const [ message, setMessage ] = useState("");

    const handleMessageSubmit = (event) => {
        event.preventDefault();
        setMessage("");
    }

    useEffect(() => {
        setActive(userId);

        return () => {
            setActive();
        };
    }, [userId]);

    return (
        <div style={{backgroundColor: "#613d5f", height: "100%", overflowY: "hidden", flexGrow: "1", overflowX: "hidden"}}>
            <div style={{overflowY: "auto", height: "calc(100% - 50px - 15px)"}}>
                <ul className='messages'>
                    {messages.map((message) => {
                        return (
                            <li key={message.id}>
                                <div className='sender'>
                                    <span style={{fontWeight: "bold"}}>
                                        {message.User.username}
                                    </span>
                                    &nbsp;
                                    <span style={{fontSize: "10px"}}>
                                        {new Date(message.created).toLocaleString()}
                                    </span>
                                </div>
                                {message.content}
                            </li>
                        )
                    })}
                </ul>
            </div>
            <form id="form" onSubmit={handleMessageSubmit}>
                <input id="input" autoComplete="off" value={message} onChange={(e) => setMessage(e.target.value)} />
                <input id="button" type="submit" value={"Send"} />
            </form>
        </div>
    );
}

export default PrivateChat;
