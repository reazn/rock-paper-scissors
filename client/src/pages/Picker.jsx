import React from "react";
import Hand from "components/Hand";
import style from "style/pages/pick.module.scss";
import "style/global.scss";
import io from "socket.io-client";

export default function Picker() {
    return (
        <div className={style.picker}>
            <div className={style.options}>
                <img className={style.image} src={"/images/rock.png"}></img>
                <img className={style.image} src={"/images/paper.png"}></img>
                <img className={style.image} src={"/images/scissors.png"}></img>
            </div>
        </div>
    );
}