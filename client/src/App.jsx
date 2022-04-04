import React, { useEffect, useState, useCallback } from "react";
import { socket } from "./context/socket";
import style from "style/app.module.scss";

import { Hand, Scoreboard, Roomcode, Picker, Results } from "components";
import Menu from "pages/Menu";

import "style/global.scss";

export default function App() {

    const [players, setPlayers] = useState({ players: {} });
    const [winner, setWinner] = useState("");
    const [room, setRoom] = useState("");
    const [color, setColor] = useState(undefined);

    useEffect(() => {
        socket.on("players", (playerData, room) => {
            setPlayers(playerData);
            setRoom(room);
        })

        socket.on("rps-winner", (gameWinner) => {
            setTimeout(() => {
                setWinner(gameWinner);
                setTimeout(() => {
                    setWinner("");
                    socket.emit("rps-reset");
                }, 3000);
            }, 3000);
        })
    });

    let playerOne, playerTwo;

    if (Object.keys(players.players).length >= 1) {
        playerOne = Object.entries(players.players)[0][1];

        if (Object.keys(players.players).length === 2) {
            playerTwo = Object.entries(players.players)[1][1];
        }
    }

    const callback = useCallback((colors) => {
        setColor(colors)
    }, [])

    return (
        <>
            <Results
                winner={winner === "draw" ? "draw" : winner.name}
                draw={winner === "draw" ? true : false}
            />
            <Roomcode code={room} />
            <Scoreboard playerOne={playerOne} playerTwo={playerTwo} />

            <div className={style.hands}>
                <Hand
                    left={true}
                    color={playerOne?.color}
                    type={winner ? playerOne?.choice : "rock"}
                    active={playerOne?.choice ? true : false}
                    moving={playerOne?.choice && playerTwo?.choice ? (winner ? false : true) : false}
                />
                <Hand
                    left={false}
                    color={playerTwo?.color}
                    type={winner ? playerTwo?.choice : "rock"}
                    active={playerTwo?.choice ? true : false}
                    moving={playerOne?.choice && playerTwo?.choice ? (winner ? false : true) : false}
                />
            </div>

            <Picker color={color} active={!winner} />
            {console.log(winner)}

            <Menu parentCallback={callback} />
            <div className={style.names}>
                <span>{JSON.stringify(players)}</span>
                <span></span>
                <input type="text"></input>
                <button onClick={() => socket.emit("getinfo")}>getinfo</button>
                <button onClick={() => console.log(didRedirect)}>isPath</button>
            </div>
        </>

    );
}