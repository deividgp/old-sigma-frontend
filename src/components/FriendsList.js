import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import * as React from 'react';
import axios from "axios";

function FriendsList() {
    const { user } = useContext(UserContext);
    return (
        <ul>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
        </ul>
    );
}

export default FriendsList;