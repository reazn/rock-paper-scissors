import React, { useEffect, useState } from "react";
import style from "style/components/scoreboard.module.scss";
import { socket } from "../context/socket";

export default function Scoreboard() {

    const [players, setPlayers] = useState({ players: {} })
    const [room, setRoom] = useState()

    useEffect(() => {
        socket.on("players", (playerData, room) => {
            setPlayers(playerData);
            setRoom(room);
            console.log("player connected on begin", players)
        })
    }, [setPlayers])

    let playerOne, playerTwo;

    if (room) {
        playerOne = Object.entries(players.players)[0][1]

        if (Object.keys(players?.players).length === 2) {
            playerTwo = Object.entries(players.players)[1][1]
        }
    }

    return (
        <div className={style.scoreboard}>
            <div className={style.players}>
                <div className={style.player}>
                    <span className={style.name}>{playerOne?.name || "Waiting..."}</span>
                    <span className={style.score}>{playerOne?.score || "0"}</span>
                </div>
                <div className={style.player}>
                    <span className={style.name}>{playerTwo?.name || "Waiting..."}</span>
                    <span className={style.score}>{playerTwo?.score || "0"}</span>
                </div>
            </div>
            {/* <span>{JSON.stringify(players)}</span> */}
        </div>
    );
}