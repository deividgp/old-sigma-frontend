import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import * as React from 'react';
import "./Me.css";
import FriendsList from "../components/FriendsList";
import PendingFriendsList from "../components/PendingFriendsList";

function Me() {
    const [windowVisible, setWindowVisible] = React.useState(false);

    const handleClickOpen = (value) => {
        setWindowVisible(value);
    };

    return (
        <div style={{flexGrow: "1"}}>
            <div className="barra">
                <ul id="horizontal-list">
                    <li><button onClick={()=>handleClickOpen(false)}>Users</button></li>
                    <li><button onClick={()=>handleClickOpen(true)}>Pending</button></li>
                    
                </ul>
            </div>
            <div className="content">
                {
                    windowVisible ? (<PendingFriendsList />) : (<FriendsList />)
                }
            </div>
        </div>
    );
}

export default Me;