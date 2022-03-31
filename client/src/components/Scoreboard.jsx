import React, { useEffect, useState } from "react";
import style from "style/components/scoreboard.module.scss";
import { socket } from "../context/socket";

export default function Scoreboard() {

    const [players, setPlayers] = useState([])
    const [room, setRoom] = useState()

    useEffect(() => {
        socket.on("players", (playerData, room) => {
            setPlayers(playerData)
            setRoom(room)
            // players = playerData;
            console.log("player connected on begin", players)
        })
    }, [setPlayers])

    return (
        <div className={style.scoreboard}>
            <span>{room}</span>
            <span>{JSON.stringify(players)}</span>
        </div>
    );
}