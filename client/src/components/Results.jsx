import React, { useEffect, useState, useRef } from "react";
import { socket } from "../context/socket";
import style from "style/components/results.module.scss";

export default function Results({ winner }) {

    return (
        <div className={style.results}>
            <div className={[style.wrapper, winner ? style.active : ""].join(" ")}>
                <span className={style.winner}>{winner}</span>
                <span>won!</span>
            </div>
        </div>
    )
}