import './Chat.css';
import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { ActiveContext } from "../contexts/ActiveContext";
import { UserContext } from "../contexts/UserContext";
import socket from "../socket"
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

function PrivateChat() {
    const bottomRef = useRef(null);
    const { user } = useContext(UserContext);
    const { userId } = useParams();
    const { setActive } = useContext(ActiveContext);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const socketListener = (data) => {
        if (userId !== data.room) return;
        setMessages(current => [...current, data.userMessage]);
    };

    const handleMessageSubmit = (event) => {
        event.preventDefault();

        const userMessage = {
            id: uuidv4(),
            UserId: user.id,
            MessageUserId: userId,
            content: message,
            created: Date.now(),
            User: {
                id: user.id,
                username: user.username
            }
        };

        socket.emit("send_private_message", { userMessage, room: userId });
        setMessages(current => [...current, userMessage]);
        setMessage("");
    }

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [messages]);

    useEffect(() => {
        setActive(userId);

        axios.get("/loggeduser/" + userId + "/messages")
            .then(res => {
                setMessages(res.data);
            })

        return () => {
            setActive();
        };
    }, [userId]);

    useEffect(() => {
        socket.on("receive_private_message", socketListener);

        return () => {
            socket.off("receive_private_message", socketListener);
        };
    }, [socket, userId]);

    return (
        <div style={{ backgroundColor: "#613d5f", height: "100%", overflowY: "hidden", flexGrow: "1", overflowX: "hidden" }}>
            <div style={{ overflowY: "auto", height: "calc(100% - 50px - 15px)" }}>
                <ul className='messages'>
                    {messages.map((message) => {
                        return (
                            <li key={message.id}>
                                <div className='sender'>
                                    <span style={{ fontWeight: "bold" }}>
                                        {message.User.username}
                                    </span>
                                    &nbsp;
                                    <span style={{ fontSize: "10px" }}>
                                        {new Date(message.created).toLocaleString()}
                                    </span>
                                </div>
                                {message.content}
                            </li>
                        )
                    })}
                </ul>
                <div ref={bottomRef} />
            </div>
            <form id="form" onSubmit={handleMessageSubmit}>
                <input id="input" autoComplete="off" value={message} onChange={(e) => setMessage(e.target.value)} />
                <input id="button" type="submit" value={"Send"} />
            </form>
        </div>
    );
}

export default PrivateChat;
