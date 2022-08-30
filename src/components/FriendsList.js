import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, NavLink } from "react-router-dom";
import * as React from 'react';
import axios from "axios";
import { FriendsContext } from "../contexts/FriendsContext";

function FriendsList() {
    const { user } = useContext(UserContext);
    const { friends } = useContext(FriendsContext);

    return (
        <ul>
            <li>&nbsp;</li>
            <li><b>FRIENDS</b></li>
            <li>&nbsp;</li>
            {friends.map((friend) => {
                return (
                    <li key={friend.id}>
                        <NavLink style={({ isActive }) => ({
                            color: isActive ? '#E95B0D' : "inherit"
                        })} to={"/channels/@me/"+friend.id}>{friend.username}</NavLink>
                    </li>
                )
            })}
        </ul>
    );
}

export default FriendsList;