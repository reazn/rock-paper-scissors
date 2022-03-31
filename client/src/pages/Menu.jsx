import React from "react";
import { useState, useContext, useEffect } from "react";
// import Hand from "components/Hand";
import style from "style/pages/menu.module.scss";
import { socket } from "../context/socket";


export default function Menu() {

    // const socket = useContext(SocketContext)
    const [input, setInput] = useState("");
    const [name, setName] = useState("");

    function test() {
        socket.emit("getinfo", "pp");
    }

    function createRoom(pname) {
        socket.emit("create-room", pname)
    }

    function joinRoom(input, pname) {
        socket.emit("join-room", input, pname)
    }

    useEffect(() => {
        socket.on("room-code", (code) => {
            console.log("room code in menu = ", code)
        })
    })


    return (
        <div className={style.menu}>
            <div>
                <input value={name} placeholder="name" onInput={e => setName(e.target.value)} type="text"></input>
                <button onClick={() => test()}>test</button>
                <button onClick={() => createRoom(name)}>Create Game</button>
                <input value={input} onInput={e => setInput(e.target.value)} type="text"></input>
                <button onClick={() => joinRoom(input, name)}>Join Game</button>
            </div>
        </div>
    );
}