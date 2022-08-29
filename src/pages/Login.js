import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import './App.css';
import React from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "@mui/material/Input";
import axios from 'axios';
import logo from "../logoSigmaWhite.png";

function Login() {
    const { setUser } = useContext(UserContext);

    const { control, handleSubmit } = useForm({
        defaultValues: {
            username: '',
            password: ""
        }
    });
    const onSubmit = data => {
        axios.post(`/login`, { username: data.username, password: data.password })
        .then(res => {
            setUser(res.data);
        })
    };

    return (
        <div>
            <header className='App-header'>
                <img src={logo} alt="Logo"/>
            </header>
            <div className='App-body'>
                <main className='App-main'>
                    <div style={{backgroundColor: "#613d5f", height: "100%", overflowY: "auto" }}>
                        <div style={{ margin: "auto", width: "50%", height: "50%", padding: "10px" }}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Controller
                                name="username"
                                control={control}
                                render={({ field }) => <Input {...field} />}
                                />
                                <br></br>
                                <br></br>
                                <Controller
                                name="password"
                                control={control}
                                render={({ field }) => <Input {...field} />}
                                />
                                <br></br>
                                <br></br>
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