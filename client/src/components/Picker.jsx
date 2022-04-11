import React, { useState, useEffect } from "react";
import style from "style/components/picker.module.scss";
import { socket } from "../context/socket";

export default function Picker({ active, color = "yellow" }) {

    const [isActive, setActive] = useState(true);

    function choice(type) {
        socket.emit("rps-choice", type);
        setActive(false);
    }

    useEffect(() => {
        setActive(active === false);
        console.log(active)
    }, [active])

    return (
        <div className={[style.picker, isActive ? style.active : ""].join(" ")}>
            <div className={style.options}>
                <img
                    onClick={() => choice("rock")}
                    className={style.image}
                    src={`./images/hands/${color}-rock.png`}
                />
                <img
                    onClick={() => choice("paper")}
                    className={style.image}
                    src={`./images/hands/${color}-paper.png`}
                />
                <img
                    onClick={() => choice("scissors")}
                    className={style.image}
                    src={`./images/hands/${color}-scissors.png`}
                />
            </div>
        </div>
    );
}