import { useContext } from "react";
import * as React from 'react';
import axios from "axios";
import { PendingFriendsContext } from "../contexts/PendingFriendsContext";
import { FriendsContext } from "../contexts/FriendsContext";
import socket from "../socket";
import { UserContext } from "../contexts/UserContext";

function PendingFriendsList() {
    const { pendingFriends, setPendingFriends } = useContext(PendingFriendsContext);
    const { setFriends } = useContext(FriendsContext);
    const { user } = useContext(UserContext);

    const acceptFriend = (id) => {
        axios.put(`/loggeduser/acceptfriend`, { userId: id })
            .then((friend) => {
                setPendingFriends(pendingFriends.filter(friend => friend.id !== id));
                setFriends(current => [...current, friend.data]);
                socket.emit("action", { room: id, action: "friend_accepted", user: { id: user.id, username: user.username } });
            })
    };

    const ignoreFriend = (id) => {
        axios.delete("/loggeduser/" + id + "/ignorefriend")
            .then(() => {
                setPendingFriends(current => current.filter(friend => friend.id !== id));
            })
    };

    return (
        <ul>
            {pendingFriends.map((pendingFriend) => {
                return (
                    <li key={pendingFriend.id}>
                        {pendingFriend.username}
                        &nbsp;
                        <button onClick={() => acceptFriend(pendingFriend.id)}>Accept</button>
                        &nbsp;
                        <button onClick={() => ignoreFriend(pendingFriend.id)}>Ignore</button>
                    </li>
                )
            })}
        </ul>
    );
}

export default PendingFriendsList;