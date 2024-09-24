import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

const socket: Socket = io(SOCKET_URL, {
    transports: ["websocket"],
    withCredentials: true,
});

export default socket;
