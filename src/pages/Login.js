import { useContext, useState, useRef, useEffect } from "react";
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
    const [width] = useState(480);
    const [height, setHeight] = useState(360);
    const [streaming, setStreaming] = useState(false);
    const canvasRef = useRef(null);
    const videoRef = useRef(null);

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

    useEffect(() => {
        const video = videoRef.current;
        const videoListener = () => {
            if (!streaming) {
                setHeight(video.videoHeight / (video.videoWidth / width));
                if (isNaN(height)) {
                    setHeight(width / (4 / 3));
                }
                setStreaming(true);
            }
        };

        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then((stream) => {
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.log("An error occurred: " + err);
            });

        video.addEventListener('canplay', videoListener);

        return () => {
            video.removeEventListener("canplay", videoListener);
        };
    }, [videoRef, canvasRef])

    const takePicture = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        if (!streaming) return;

        context.drawImage(video, 0, 0, width, height);

        setTimeout(function () {
            context.fillStyle = "#FFFFFF";
            context.fillRect(0, 0, width, height);
        }, 2000);

        canvas.toBlob((blob) => {
            const formData = new FormData();
            formData.append('imatge', blob);

            axios.post("/loginface", formData, {
                headers: { 'content-type': 'multipart/form-data' }
            })
                .then((res) => {
                    setUser(res.data);
                    const userid = res.data.id;
                    socket.auth = { userid };
                    socket.connect();
                    socket.emit("join_room", userid);
                });
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
                        <div style={{ textAlign: "center", padding: "10px" }}>
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
                            <h3>
                                Face login
                                <br></br>
                                <button onClick={takePicture}>Take picture</button>
                            </h3>
                            <canvas ref={canvasRef}
                                width={width}
                                height={height}
                                style={{ margin: "10px" }}>
                            </canvas>
                            <video ref={videoRef}
                                width={width}
                                height={height}
                                style={{ margin: "10px" }}>
                            </video>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Login;