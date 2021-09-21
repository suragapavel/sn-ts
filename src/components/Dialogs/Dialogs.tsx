import React, {ChangeEvent} from "react";
import s from './Dialog.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {
    DialogsPageType,
} from '../../redux/store'
import {DialogsPropsType} from "./DialogsContainer";
import {DialogsType, MessagesType} from "../../redux/dialogs-reducer";


type DialogsPagePropsType = DialogsPropsType & {
    updateNewMessageBody: (body:string) => void
    sendMessage: ()=>void
    dialogsPage:DialogsPageType
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {

    let state = props.dialogsPage
    let dialogsElements = state.dialogs.map((d: DialogsType) => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = state.messages.map((m: MessagesType) => <Message message={m.message} id={m.id}/>)
    let newMessageBody = state.newMessageBody

    let onSendMessageClick = () => {
        props.sendMessage()
    }
    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value
        props.updateNewMessageBody(body)
    }

    return (
        <div>
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
                <div className={s.messages}>
                    <div>{messagesElements}</div>
                    <div>
                        <div><textarea value={newMessageBody}
                                       onChange={onNewMessageChange}
                                       placeholder={'Enter your message'}/></div>
                        <div>
                            <button onClick={onSendMessageClick}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;