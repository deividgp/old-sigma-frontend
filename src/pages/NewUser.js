import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import * as React from 'react';
import "./Me.css";
import logo from "../logoSigmaWhite.png";
import axios from "../axios";

function NewUser() {
    const { setUser } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [email, setEmail] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("avatar", avatar);
        formData.append("email", email);

        axios.post("/users/newuser", formData,{
            headers: { 'content-type': 'multipart/form-data' }
        })
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            });
    };

    return (
        <div>
            <header className='App-header'>
                <img src={logo} alt="Logo" />
                <nav>
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/newuser">New user</Link></li>
                    </ul>
                </nav>
            </header>
            <div className='App-body'>
                <main className='App-main'>
                    <div style={{ backgroundColor: "#613d5f", height: "100%", overflowY: "auto" }}>
                        <div style={{ margin: "auto", width: "50%", height: "50%", padding: "10px" }}>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="username">Username</label>
                                <br></br>
                                <input id="username" type={"text"} value={username} onChange={(e) => setUsername(e.target.value)}></input>
                                <br></br>
                                <label htmlFor="email">Email (no use for now)</label>
                                <br></br>
                                <input id="email" type={"email"} value={email} onChange={(e) => setEmail(e.target.value)}></input>
                                <br></br>
                                <label htmlFor="password">Password</label>
                                <br></br>
                                <input id="password" type={"password"} value={password} onChange={(e) => setPassword(e.target.value)}></input>
                                <br></br>
                                <label htmlFor="avatar">Avatar (used for face recognition)</label>
                                <br></br>
                                <input id="avatar" type={"file"} accept=".jpg,.jpeg,.png" onChange={(e) => setAvatar(e.target.files[0])}></input>
                                <br></br><br></br>
                                <input type="submit" value="Sign up" />
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default NewUser;