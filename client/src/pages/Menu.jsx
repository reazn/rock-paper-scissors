import React from "react";
import { useState, useContext, useEffect } from "react";
import Hand from "components/Hand";
import style from "style/pages/menu.module.scss";
import { SocketContext, createRoom, joinRoom } from "../context/socket";


export default function Menu() {

    const socket = useContext(SocketContext)

    useEffect(() => {
        socket.on("room-code", (code) => {
            console.log("room code in menu = ", code)
        })
    })

    const [input, setInput] = useState("");

    return (
        <div className={style.menu}>
            <div>
                <button onClick={() => createRoom()}>Create Game</button>
                <input value={input} onInput={e => setInput(e.target.value)} type="text"></input>
                <button onClick={() => joinRoom(input)}>Join Game</button>
            </div>
        </div>
    );
}