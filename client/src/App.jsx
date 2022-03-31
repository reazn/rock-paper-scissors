import React, { useEffect, useState } from "react";
import { Hand, Scoreboard } from "components";
import Menu from "pages/Menu";

import style from "style/app.module.scss";
import "style/global.scss";
import { socket } from "./context/socket";

export default function App() {

    const [players, setPlayers] = useState([])

    useEffect(() => {
        socket.on("players", playerData => {
            setPlayers(playerData)
            // players = playerData;
            console.log("player connected on begin", players)
        })
    }, [setPlayers])

    return (
        <>
            <Scoreboard />
            <div className={style.hands}>
                <Hand left={true} type="paper" />
                <Hand left={false} type="rock" />
            </div>
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