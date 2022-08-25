//import './ServerChat.css';
import * as React from 'react';
import axios from "axios";

function PrivateChatsList() {

    /*React.useEffect(() => {
        axios.get("/loggeduser/friends")
        .then(res => {
            console.log(res.data);
        })
    }, []);*/

    return (
        <div style={{backgroundColor: "#2B3180", minWidth: "200px", maxWidth: "200px", height: "100%", overflowY: "auto"}}>
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
                <li>hola</li>
                <li>hola</li>
                <li>hola</li>
            </ul>
        </div>
    );
}

export default PrivateChatsList;