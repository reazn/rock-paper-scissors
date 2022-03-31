import React, { useEffect, useState, useRef } from "react";
import Hand from "components/Hand";
import style from "style/app.module.scss";
import "style/global.scss";
import { SocketContext, socket } from "./context/socket";
// import io from "socket.io-client";
// const socket = io("ws://localhost:6969");

// let path = location.pathname.split("/");
// path = path[path.length - 1];

export default function App() {

    // const [names, setName] = useState()
    // const [didRedirect, redirect] = useState(false);
    // const socket = useRef(io("ws://localhost:6969"))

    // useEffect(() => {



    // if (path) {
    //     socket.emit("join-room", (path));
    //     console.log(path, "was path")
    // }
    // } else {
    // if (didRedirect === false) {
    //     socket.emit("create-room")
    // }
    // }

    // socket.on("no-room", () => {
    //     // socket.emit("create-room")
    //     console.log("no room")
    // })

    // socket.on("room-code", (code) => {
    //     console.log("room code: ", code)
    //     redirect(true);
    //     console.log(didRedirect, "did redirect?")
    //     location.pathname = code;
    //     // window.history.replaceState(null, "test", `/ddddd${code}`)
    // })

    // socket.on("game", (res) => {
    //     console.log(JSON.parse(res));
    // })

    // socket.on("full", () => {
    //     console.log("Room is full")
    // })

    // })

    return (
        <SocketContext.Provider value={socket}>
            <div className={style.hands}>
                <Hand left={true} type="paper" />
                <Hand left={false} type="rock" />
            </div>
            <div className={style.names}>
                <span>hi</span>
                <span></span>
                <input type="text"></input>
                <button onClick={() => socket.emit("getinfo")}>getinfo</button>
                <button onClick={() => console.log(didRedirect)}>isPath</button>
            </div>
        </SocketContext.Provider>
    );
}