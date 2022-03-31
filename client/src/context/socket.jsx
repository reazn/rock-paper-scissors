import React from "react";
import io from "socket.io-client";
export const socket = io("ws://localhost:6969");
// export const SocketContext = React.createContext()

// export function createRoom() {
    // socket.emit("create-room")
// }

// export function joinRoom(room) {
    // socket.emit("join-room", room)
// }