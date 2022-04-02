import React, { useEffect, useState } from "react";
import { socket } from "./context/socket";
import style from "style/app.module.scss";

import { Hand, Scoreboard, Roomcode, Picker, Results } from "components";
import Menu from "pages/Menu";

import "style/global.scss";

export default function App() {

    const [players, setPlayers] = useState({ players: {} });
    const [winner, setWinner] = useState("");
    const [room, setRoom] = useState("");

    useEffect(() => {
        socket.on("players", (playerData, room) => {
            setPlayers(playerData);
            setRoom(room)
            console.log("player connected on begin", players)
        })

        socket.on("rps-winner", (gameWinner) => {
            setTimeout(() => {
                setWinner(gameWinner);
                setTimeout(() => {
                    setWinner("");
                    socket.emit("rps-reset")
                }, 3000)
            }, 3000);
        })
    });

    let playerOne, playerTwo;

    if (Object.keys(players.players).length >= 1) {
        playerOne = Object.entries(players.players)[0][1]

        if (Object.keys(players.players).length === 2) {
            playerTwo = Object.entries(players.players)[1][1]
        }
    }

    return (
        <>
            {/* todo - draw */}
            <Results winner={winner} />
            <Roomcode code={room} />
            <Scoreboard playerOne={playerOne} playerTwo={playerTwo} />

            <div className={style.hands}>
                <Hand
                    left={true}
                    type={winner ? playerOne?.choice : "rock"}
                    active={playerOne?.choice ? true : false}
                    moving={playerOne?.choice && playerTwo?.choice ? (winner ? false : true) : false}
                />
                <Hand
                    left={false}
                    type={winner ? playerTwo?.choice : "rock"}
                    active={playerTwo?.choice ? true : false}
                    moving={playerOne?.choice && playerTwo?.choice ? (winner ? false : true) : false}
                />
            </div>

            <Picker />
            <div className={style.names}>
                <Menu />
                <span>{JSON.stringify(players)}</span>
                <span></span>
                <input type="text"></input>
                <button onClick={() => socket.emit("getinfo")}>getinfo</button>
                <button onClick={() => console.log(didRedirect)}>isPath</button>
            </div>
        </>

    );
}