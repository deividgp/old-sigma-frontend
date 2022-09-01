import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import './App.css';
import axios from "../axios";
import Loading from "../components/Loading";
import socket from "../socket";

function Logout() {
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        axios.get(`/logout`)
            .then(() => {
                setUser(null);
                socket.disconnect();
            })
            .catch(() => {
                console.log("error");
            })
    }, []);

    return (
        <Loading />
    );
}

export default Logout;