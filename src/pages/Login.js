import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import './App.css';
import axios from "../axios";
import logo from "../logoSigmaWhite.png";
import socket from "../socket"

function Login() {
    const { setUser } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/login`, { username: username, password: password })
            .then(res => {
                setUser(res.data);
                const userid = res.data.id;
                socket.auth = { userid };
                socket.connect();
                socket.emit("join_room", userid);
            })
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
                                <label htmlFor="password">Password</label>
                                <br></br>
                                <input id="password" type={"password"} value={password} onChange={(e) => setPassword(e.target.value)}></input>
                                <br></br><br></br>
                                <input type="submit" value="Login" />
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Login;