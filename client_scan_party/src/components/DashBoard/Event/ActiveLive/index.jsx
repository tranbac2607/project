import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import ChatRoomContent from '../../../ChatRoom/ChatRoomContent';
import eventService from '../eventService';
import LiquidChart from './LiquidChart';
import QRCode from 'qrcode.react';
import { Camera as ScanIcon, Dribbble as MiniGameIcon } from 'react-feather';
import PopUpCheckTicket from '../../../Guest/ScanTicket';
import PopupSelectGame from './PopupSelectGame';
import MiniGame from './MiniGame/index';
import PopUpScanTicket from './PopupScanTicket';
import { useTranslation } from 'react-i18next';

function ActiveLive() {
    const {t} = useTranslation()
    const { eventId } = useParams();

    const [DetailEvent, setDetailEvent] = useState();
    const [isShowPopupScan, setShowPopupScan] = useState(false);
    const [isShowPopupMiniGame, setShowPopupMiniGame] = useState(false);
    const [miniGame, setMiniGame] = useState(0);

    useEffect(() => {
        getDetailEvent()
    }, [])

    async function getDetailEvent() {
        try {
            const res = await eventService.getDetailEvent(eventId);
            setDetailEvent(res);
        } catch (error) {
            toast(t(error.response.data.message));
        }
    }

    function handleSelectMiniGame(idGame) {
        setMiniGame(idGame);
        setShowPopupMiniGame(false)
    }

    return (
        <>
            {isShowPopupScan && <PopUpScanTicket isShow={isShowPopupScan} setShow={setShowPopupScan} />}
            {isShowPopupMiniGame && <PopupSelectGame isShow={isShowPopupMiniGame} setShow={setShowPopupMiniGame} onSelectMiniGame={handleSelectMiniGame} />}
            <Grid container>
                <Grid item sm={8}>
                    <Paper elevation={3} className="m-1 p-1">
                        <ChatRoomContent aliasName="Quản trị viên" chatId={DetailEvent?.chat} isShowSideBar={false} />
                    </Paper>
                </Grid>
                <Grid item sm={4}>
                    {!!miniGame && <MiniGame gameId={miniGame} setShowPopupMiniGame={setShowPopupMiniGame} />}
                    <Paper elevation={3} className="m-1 p-1">
                        <Box style={{ height: '200px' }}>
                            <LiquidChart />
                        </Box>
                    </Paper>
                    <Paper elevation={3} className="m-1 p-1">
                        <Typography variant="h5" className="m-1" style={{ textAlign: 'center', marginBottom: '1rem' }}>{t('scan_to_chat_room')}</Typography>
                        <Box style={{ display: 'flex', justifyContent: 'center' }}>
                            <QRCode value={`http://localhost:3000/guests/${DetailEvent?.chat}`} />
                        </Box>
                    </Paper>
                    <Paper elevation={3} className="p-1 m-1">
                        <Grid container spacing={1} >
                            <Grid item sm={6}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    endIcon={<ScanIcon />}
                                    onClick={() => { setShowPopupScan(true) }}
                                    fullWidth
                                >
                                    {t('scan_ticket')}
                                </Button>
                            </Grid>
                            <Grid item sm={6}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    endIcon={<MiniGameIcon />}
                                    onClick={() => { setShowPopupMiniGame(true) }}
                                    fullWidth
                                >
                                    {t('mini_game')}
                        </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

        </>
    )
}

export default ActiveLive;