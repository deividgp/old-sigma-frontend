/*import { useContext } from "react";
import { UserContext } from "../context/UserContext";*/
import React from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "@mui/material/Input";
import axios from 'axios';

function Login() {
    //const { user, setUser } = useContext(UserContext);
    const { control, handleSubmit } = useForm({
    defaultValues: {
        username: '',
        password: ""
    }
    });
    const onSubmit = data => {
        axios.post(`/login`, { username: data.username, password: data.password })
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
    };

    const logOut = () => {
        axios.get(`/logout`, { withCredentials: true })
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
    };

    return (
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
                    <input type="submit" />
                </form>
                <button onClick={logOut}>Logout</button>
            </div>
        </div>
    );
}

export default Login;