import React, { useEffect, useRef, useState } from 'react';
import './index.scss';
import io from "socket.io-client"
import { FastField, Form, Formik } from 'formik';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { SPTextField } from '../form_field';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Activity } from 'react-feather';
const socket = io.connect(process.env.REACT_APP_API_URL);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    inputText: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px'
    },
    container: {
        backgroundColor: theme.palette.background.default,
    },
    message: {
        backgroundColor: theme.palette.background.paper,
        padding: "10px",
        marginBottom: "15px",
        borderRadius: "5px",
        boxShadow: "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)"
    }
}));

function ChatRoomContent({ chatId, aliasName, leaveRoom, isShowSideBar }) {
    const classes = useStyles();
    const { t } = useTranslation();
    const [dataRoomChat, setDataRoomChat] = useState([]);
    const bottomRef = useRef();

    useEffect(() => {
        socket.emit("getListChat", chatId);
    }, [chatId])

    useEffect(() => {
        leaveRoom && scrollToBottom()
    }, [dataRoomChat])

    function handleSubmit(value, { resetForm }) {
        //emit message to server
        resetForm({})
        return socket.emit("updateListMessage", chatId, { ...value, user: aliasName, createdAt: new Date() })
    }

    socket.on("listChat", (newData) => {
        setDataRoomChat(newData)
    })

    function displayConversation() {
        return dataRoomChat?.messages?.map(ele => (
            <div className={` message ${classes.message}`} >
                <p className="meta">{ele.user} <span>{moment(ele?.createdAt).format('DD-MM-YYYY HH:mm A')}</span></p>
                <p className="text">
                    {ele.message}
                </p>
            </div >
        ))
    }

    function scrollToBottom() {
        bottomRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <>
            <div className={`chat-container ${classes.container}`}>
                <header className="chat-header">
                    <h1><i className="fas fa-smile"></i> ChatRoom</h1>
                    {leaveRoom && <a className="btn" onClick={leaveRoom}>{t('leave_room')}</a>}
                </header>
                <main className={isShowSideBar ? "chat-main" : ''}>
                    {isShowSideBar && <div className="chat-sidebar">
                        <h3><i className="fas fa-comments"></i> {t('room_name')}:</h3>
                        <h2 id="room-name">{dataRoomChat?.name}</h2>
                        <h3><i className="fas fa-users"></i>{t('alias_name')}</h3>
                        <ul id="users">
                            <li style={{ fontWeight: 'bold', fontSize: '18px' }}><Activity /> {aliasName}</li>
                        </ul>
                    </div>}
                    <div className="chat-messages" style={{ width: '100%' }}>
                        {displayConversation()}
                        <span style={{ float: 'right' }}>{dataRoomChat?.messages?.length} msg</span>
                        <div ref={bottomRef} className="list-bottom"></div>
                    </div>
                </main>
                <div className="chat-form-container">
                    <Formik
                        initialValues={{ message: '' }}
                        onSubmit={handleSubmit}
                    >
                        {formikProps => {
                            const { isSubmitting } = formikProps;
                            return (
                                <Form>
                                    <FastField
                                        name="message"
                                        component={SPTextField}
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        className={classes.inputText}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        style={{ width: "100px" }}
                                        disabled={isSubmitting}
                                    >
                                        {t('send')}
                                    </Button>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </div >
        </>
    )
}

ChatRoomContent.defaultProps = {
    isShowSideBar: true
}

export default ChatRoomContent;