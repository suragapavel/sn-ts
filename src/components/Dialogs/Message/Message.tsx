import React from "react";
import s from './../Dialog.module.css'
import {MessagesType} from "../../../redux/dialogs-reducer";

const Message:React.FC<MessagesType> = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

export default Message;