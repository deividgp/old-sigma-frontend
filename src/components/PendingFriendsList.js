import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import * as React from 'react';
import axios from "axios";

function PendingFriendsList() {
    const { user } = useContext(UserContext);

    /*React.useEffect(() => {
        axios.get("/loggeduser/pendingfriends")
        .then(res => {
            console.log(res.data);
        })
    }, []);*/

    return (
        <ul>
            <li>hola</li>
            <li>hola</li>
        </ul>
    );
}

export default PendingFriendsList;