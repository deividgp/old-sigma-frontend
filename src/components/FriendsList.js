import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as React from 'react';
import { FriendsContext } from "../contexts/FriendsContext";
import "./UserState.css";
import { OnlineUsersContext } from '../contexts/OnlineUsersContext';
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import socket from "../socket";
import { ActiveContext } from "../contexts/ActiveContext";

function FriendsList() {
    const navigate = useNavigate();
    const { friends, setFriends } = useContext(FriendsContext);
    const { onlineUsers } = useContext(OnlineUsersContext);
    const { user } = useContext(UserContext);
    const { active } = useContext(ActiveContext);

    const removeFriend = (friendId) => {
        axios.delete("/loggeduser/" + friendId + "/deletefriend")
            .then(() => {
                if (active === friendId)
                    navigate("/", { replace: true });
                setFriends(current => current.filter(friend => friend.id !== friendId));
                socket.emit("action", { room: friendId, action: "friend_deleted", friendId: user.id });
            });
    };

    return (
        <ul>
            <li><b>FRIENDS</b></li>
            <li>&nbsp;</li>
            {friends.map((friend) => {
                return (
                    <li key={friend.id}>
                        <span className={onlineUsers.includes(friend.id) ? "green" : "grey"} />
                        &nbsp;
                        <NavLink style={({ isActive }) => ({
                            color: isActive ? '#E95B0D' : "inherit"
                        })} to={"/channels/@me/" + friend.id}>{friend.username}</NavLink>
                        &nbsp;
                        <button onClick={() => removeFriend(friend.id)}>Remove friend</button>
                    </li>
                )
            })}
        </ul>
    );
}

export default FriendsList;