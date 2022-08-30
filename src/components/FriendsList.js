import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, NavLink } from "react-router-dom";
import * as React from 'react';
import { FriendsContext } from "../contexts/FriendsContext";
import "./UserState.css";
import { OnlineUsersContext } from '../contexts/OnlineUsersContext';

function FriendsList() {
    const { friends } = useContext(FriendsContext);
    const { onlineUsers } = useContext(OnlineUsersContext);

    return (
        <ul>
            <li>&nbsp;</li>
            <li><b>FRIENDS</b></li>
            <li>&nbsp;</li>
            {friends.map((friend) => {
                return (
                    <li key={friend.id}>
                        <span className={onlineUsers.includes(friend.id) ? "green" : "grey"}/>
                        &nbsp;
                        <NavLink style={({ isActive }) => ({
                            color: isActive ? '#E95B0D' : "inherit"
                        })} to={"/channels/@me/" + friend.id}>{friend.username}</NavLink>
                    </li>
                )
            })}
        </ul>
    );
}

export default FriendsList;