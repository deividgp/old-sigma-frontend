import './Chat.css';
import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { ActiveContext } from "../contexts/ActiveContext";
import axios from "axios"
import socket from "../socket"
import { UserContext } from '../contexts/UserContext';
import { v4 as uuidv4 } from 'uuid';

function ServerChat() {
    const bottomRef = useRef(null);
    const { channelId } = useParams();
    const { setActive } = useContext(ActiveContext);
    const [ messages, setMessages ] = useState([]);
    const [ message, setMessage ] = useState("");
    const { user } = useContext(UserContext);
    const socketListener = (data) => {
        if(channelId !== data.room) return;

        setMessages(current => [...current, data.userMessage]);
    };
    
    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'auto'});
    }, [messages]);

    const handleMessageSubmit = (event) => {
        event.preventDefault();

        const userMessage = {
            id: uuidv4(),
            ChannelId: channelId,
            UserId: user.id,
            content: message,
            created: Date.now(),
            User: {
                id: user.id,
                username: user.username
            }
        };

        socket.emit("send_server_message", { userMessage, room: channelId });
        setMessages(current => [...current, userMessage]);
        setMessage("");
    }

    useEffect(() => {
        setActive(channelId);
        
        axios.get("/channels/"+channelId+"/messages")
        .then(res => {
          console.log(res.data);
          setMessages(res.data);
        })

        return () => {
            setActive();
        };
    }, [channelId]);

    useEffect(() => {
        socket.on("receive_server_message", socketListener);

        return () => {
            socket.off("receive_server_message", socketListener);
        };
    }, [socket, channelId]);

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
                <div ref={bottomRef} />
            </div>
            <form id="form" onSubmit={handleMessageSubmit}>
                <input id="input" autoComplete="off" value={message} onChange={(e) => setMessage(e.target.value)} />
                <input id="button" type="submit" value={"Send"} />
            </form>
        </div>
    );
}

export default ServerChat;
