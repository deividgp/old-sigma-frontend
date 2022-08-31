import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import * as React from 'react';
import "./Me.css";
import FriendsList from "../components/FriendsList";
import PendingFriendsList from "../components/PendingFriendsList";
import axios from "axios";
import socket from "../socket";

function Me() {
    const [windowVisible, setWindowVisible] = React.useState(false);
    const [name, setName] = React.useState("");
    const { user } = useContext(UserContext);

    const handleClickOpen = (value) => {
        setWindowVisible(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (user.username != name) {
            axios.put(`/loggeduser/addfriend`, { username: name })
                .then((res) => {
                    socket.emit("action", { room: res.data.id, action: "friend_added", user: { id: user.id, username: user.username } });
                    alert("Request sent");
                })
                .catch(() => {
                    alert("Error");
                })
        }
        setName("");
    }

    return (
        <div style={{ flexGrow: "1" }}>
            <div className="barra">
                <ul id="horizontal-list">
                    <li><button onClick={() => handleClickOpen(false)}>Pending</button></li>
                    <li><button onClick={() => handleClickOpen(true)}>Friends</button></li>
                    <li>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            &nbsp;
                            <input type="submit" value={"Add friend"} />
                        </form>
                    </li>
                </ul>
            </div>
            <div className="content">
                {
                    windowVisible ? (<FriendsList />) : (<PendingFriendsList />)
                }
            </div>
        </div>
    );
}

export default Me;