import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import './App.css';
import React from "react";
import axios from 'axios';
import Loading from "../components/Loading";

function Logout() {
    const { setUser } = useContext(UserContext);

    React.useEffect(() => {
        axios.get(`/logout`)
        .then(res => {
            console.log(res.data);
            setUser(null);
        })
    }, []);

    return (
        <Loading />
    );
}

export default Logout;