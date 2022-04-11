import React from "react";
import { useState, useEffect } from "react";
import style from "style/components/errors.module.scss";
import { socket } from "../context/socket";

export default function Errors() {

    const [message, setMessage] = useState("");

    useEffect(() => {
        socket.on("error", (message) => {
            setMessage(message);

            setTimeout(() => {
                setMessage("");
            }, 3000);
        })
    }, [])

    return (
        <div className={[style.errors, message ? style.active : ""].join(" ")} >
            <p>{message}</p>
        </div>
    )

}