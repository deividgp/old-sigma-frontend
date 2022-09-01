import { io } from "socket.io-client";

const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:4000";

const socket = io(baseURL, { autoConnect: false });

export default socket;