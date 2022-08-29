import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import * as React from 'react';
import axios from "axios";
import { PendingFriendsContext } from "../contexts/PendingFriendsContext";
import { FriendsContext } from "../contexts/FriendsContext";

function PendingFriendsList() {
    const { user } = useContext(UserContext);
    const { pendingFriends, setPendingFriends } = useContext(PendingFriendsContext);
    const { friends, setFriends } = useContext(FriendsContext);

    const acceptFriend = (id) => {
        axios.put(`/loggeduser/acceptfriend`, { userId: id })
        .then((user) => {
            setPendingFriends(pendingFriends.filter(friend => friend.id !== id));
            console.log(user.data);
            setFriends(current => [...current, user.data]);
        })
    };

    const ignoreFriend = (id) => {
        axios.delete("/loggeduser/"+id+"/ignorefriend")
        .then(() => {
            setPendingFriends(pendingFriends.filter(friend => friend.id !== id));
        })
    };

    return (
        <ul>
            {pendingFriends.map((pendingFriend) => {
                return (
                    <li key={pendingFriend.id}>
                        {pendingFriend.username}
                        <button onClick={() => acceptFriend(pendingFriend.id)}>Accept</button>
                        <button onClick={() => ignoreFriend(pendingFriend.id)}>Ignore</button>
                    </li> 
                )
            })}
        </ul>
    );
}

export default PendingFriendsList;