import React, { useEffect, useRef, useState } from 'react';
import './index.scss';
import io from "socket.io-client"
import { FastField, Form, Formik } from 'formik';
import { Button, Grid } from '@material-ui/core';
import { SPTextField } from '../form_field';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import ChatRoomContent from './ChatRoomContent';
import JoinChat from './JoinChat';
const socket = io.connect(process.env.REACT_APP_API_URL);

function ChatRoom({ chatId }) {
    const [aliasName, setAliasName] = useState(localStorage.getItem("aliasName"));
    return (
        <>
            {aliasName
                ? <ChatRoomContent aliasName={aliasName} chatId={chatId} leaveRoom={() => { localStorage.removeItem('aliasName'); setAliasName('') }} />
                : <JoinChat joinChat={() => setAliasName(localStorage.getItem("aliasName"))} />}
        </>
    )
}

export default ChatRoom;