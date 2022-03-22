import React from "react";
import Hand from "components/Hand";
import style from "style/app.module.scss";
import "style/global.scss";
import io from "socket.io-client";

const socket = io("http://localhost:6969"); socket.emit("newGame")

export default function App() {
    return (
        <div className={style.hands}>
            <Hand left={true} type="paper"></Hand>
            <Hand left={false} type="rock"></Hand>
        </div>
    );
}