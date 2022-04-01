import React, { useEffect, useState } from "react";
import style from "style/components/roomcode.module.scss";
import { socket } from "../context/socket";

export default function Roomcode() {

    const [room, setRoom] = useState()

    useEffect(() => {
        socket.on("players", (_, room) => {
            setRoom(room)
        })
    })

    return (
        <div className={style.roomcode}>
            <span className={style.code}>{room}</span>
        </div>
    );
}