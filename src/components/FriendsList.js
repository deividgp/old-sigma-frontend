import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import * as React from 'react';
import axios from "axios";
import { FriendsContext } from "../contexts/FriendsContext";

function FriendsList() {
    const { user } = useContext(UserContext);
    const { friends } = useContext(FriendsContext);

    return (
        <ul>
            {friends.map((friend) => {
                return (
                    <li key={friend.id}>
                        <Link to={"/channels/@me/"+friend.id}>{friend.username}</Link>
                    </li>
                )
            })}
        </ul>
    );
}

export default FriendsList;