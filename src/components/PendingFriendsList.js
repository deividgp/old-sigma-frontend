import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import * as React from 'react';
import axios from "axios";
import { PendingFriendsContext } from "../contexts/PendingFriendsContext";

function PendingFriendsList() {
    const { user } = useContext(UserContext);
    const { pendingFriends } = useContext(PendingFriendsContext);

    return (
        <ul>
            {pendingFriends.map((pendingFriend) => {
                return (
                    <li key={pendingFriend.id}>
                        {pendingFriend.username}
                    </li> 
                )
            })}
        </ul>
    );
}

export default PendingFriendsList;