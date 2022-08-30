import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import * as React from 'react';
import "./Me.css";
import FriendsList from "../components/FriendsList";
import PendingFriendsList from "../components/PendingFriendsList";
import axios from "axios";

function Me() {
    const [windowVisible, setWindowVisible] = React.useState(false);
    const [name, setName] = React.useState("");

    const handleClickOpen = (value) => {
        setWindowVisible(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`/loggeduser/addfriend`, { username: name })
            .then(res => {
                setName("");
            })
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