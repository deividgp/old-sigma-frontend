import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Navigate } from 'react-router-dom';

export function NotLoggedIn({ children }) {
    const { user } = useContext(UserContext);

    if (user == null)
        return <Navigate to="/login" />

    return children;
}

export function LoggedIn({ children }) {
    const { user } = useContext(UserContext);

    if (user != null)
        return <Navigate to="/" />

    return children;
}