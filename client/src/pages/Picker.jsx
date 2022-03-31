import React, { useEffect, useState, useRef } from "react";
import Hand from "components/Hand";
import style from "style/pages/pick.module.scss";
import { socket } from "../context/socket";
// import "style/global.scss";

export default function Picker() {

    function choice(type) {
        socket.emit("rps-choice", type)
    }

    return (
        <div className={style.picker}>
            <div className={style.options}>
                <img onClick={() => choice("rock")} className={style.image} src={"/images/rock.png"}></img>
                <img onClick={() => choice("paper")} className={style.image} src={"/images/paper.png"}></img>
                <img onClick={() => choice("scissors")} className={style.image} src={"/images/scissors.png"}></img>
            </div>
        </div>
    );
}