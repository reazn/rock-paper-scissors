import io from "socket.io-client";

export const socket = process.env.NODE_ENV === "production"
    ? io("https://reazn.dev", { path: "/rpssocket" })
    : io("ws://localhost:6969");
