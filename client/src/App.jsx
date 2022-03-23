import React, { useEffect, useState, useRef } from "react";
import Hand from "components/Hand";
import style from "style/app.module.scss";
import "style/global.scss";
import io from "socket.io-client";
const socket = io("ws://localhost:6969");

let path = location.pathname.split("/");
path = path[path.length - 1];


export default function App() {

    const [names, setName] = useState()
    // const socket = useRef(io("ws://localhost:6969"))

    useEffect(() => {

        if (path) {
            socket.emit("join-room", (path));
            console.log(path, "was path")
        } else {
            socket.emit("create-room")
        }

        socket.on("no-room", () => {
            socket.emit("create-room")
            console.log(path, "no path")
        })

        socket.on("room-code", (code) => {
            console.log("room code: ", code)
            location.pathname = code;
        })

        socket.on("game", (res) => {
            console.log(JSON.parse(res));
        })

        socket.on("full", () => {
            console.log("Room is full")
        })

    })

    return (
        <>
            <div className={style.hands}>
                <Hand left={true} type="paper" />
                <Hand left={false} type="rock" />
            </div>
            <div className={style.names}>
                <span>hi</span>
                <span></span>
                <input type="text"></input>
                <button onClick={() => socket.emit("getinfo")}>getinfo</button>
            </div>
        </>
    );
}