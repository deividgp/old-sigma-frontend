import { useState } from 'react';
import './Chat.css';

function Chat() {
    const [ message, setMessage ] = useState("");

    const handleMessageSubmit = (event) => {
        event.preventDefault();
        setMessage("");
    }

    return (
        <div style={{backgroundColor: "#613d5f", height: "100%", overflowY: "hidden", flexGrow: "1", overflowX: "hidden"}}>
            <div style={{overflowY: "auto", height: "calc(100% - 50px - 15px)"}}>
                <ul>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                </ul>
            </div>
            <form id="form" onSubmit={handleMessageSubmit}>
                <input id="input" autocomplete="off" value={message} onChange={(e) => setMessage(e.target.value)} />
                <input id="button" type="submit" value={"Send"} />
            </form>
        </div>
    );
}

export default Chat;