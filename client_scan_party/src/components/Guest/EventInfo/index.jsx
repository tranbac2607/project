import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import eventService from '../../DashBoard/Event/eventService';
import ChatRoom from '../../ChatRoom';
import GuestRating from '../GuestRating';
import PopUpCheckTicket from '../ScanTicket';
import { Aperture as ScanIcon, UserPlus as AddIcon } from 'react-feather'
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    root: {
        // backgroundColor: theme.palette.background.dark,
        minHeight: "100%",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    description: {
        margin: theme.spacing(2),
    },
}));


function EventInfo({ setShowForm }) {
    const { t } = useTranslation();
    const { eventId } = useParams();
    const classes = useStyles();

    const [eventInfo, setEventInfo] = useState();
    const [isActive, setActive] = useState(false);
    const [isShowPopupScan, setShowPopupScan] = useState(false);

    useEffect(() => {
        eventId && getEventInfo()
    }, [])

    useEffect(() => {
        eventInfo && setActive(activeLive())
    }, [eventInfo])

    async function getEventInfo() {
        try {
            const res = await eventService.getDetailEvent(eventId);
            setEventInfo(res);
        } catch (error) {
            toast(t(error.response.data.message));
        }
    }
    function createMarkup() {
        return { __html: eventInfo?.description }
    }

    function activeLive() {
        const time = eventInfo?.time;
        const beginTime = moment(time.beginTime).format("MM/DD/YY");
        const endTime = moment(time.endTime).format("MM/DD/YY");
        const now = moment(new Date(), 'MM/DD/YY')
        const dayRemain = -now.diff(beginTime, "minutes");
        if (dayRemain > 0) {
            return false;
        }
        if (dayRemain < 0) {
            const timeRemain = now.diff(endTime, "minutes");
            if (timeRemain < 0) {
                return false
            }
        }
        return true
    }

    return (
        <>
            {isShowPopupScan && <PopUpCheckTicket isShow={isShowPopupScan} setShow={setShowPopupScan} />}
            {isActive && <GuestRating />}
            <Grid container>
                <Grid item xs={12}>
                    <Paper elevation={12} className="p-1 m-1">
                        <Typography variant="h5">{t('description')}</Typography>
                        <div dangerouslySetInnerHTML={createMarkup()} className='editor'></div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={12} className="p-1 m-1">
                        <Typography variant="h5">{t('event_info')}</Typography>
                        <Grid container>
                            <Grid item lg={11} spin>
                                <Typography>{t('event_name')}: {eventInfo?.name}</Typography>
                            </Grid>
                            <Grid item lg={11}>
                                <Typography>{t('address')}: {eventInfo?.address}</Typography>
                            </Grid>
                            <Grid item lg={11}>
                                <Typography>{t('organization')}: {eventInfo?.company}</Typography>
                            </Grid>
                            <Grid item lg={11}>
                                <Typography>
                                    {t('start_time')}:{" "}
                                    {moment(eventInfo?.time?.beginTime).format(
                                        "MMMM Do YYYY, h:mm:ss a"
                                    )}
                                </Typography>
                            </Grid>
                            <Grid item lg={11}>
                                <Typography>
                                    {t('end_time')}:{" "}
                                    {moment(eventInfo?.time?.endTime).format(
                                        "MMMM Do YYYY, h:mm:ss a"
                                    )}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={12} className="p-1 m-1">
                        <Typography variant="h5">{t('manager_info')}</Typography>
                        <Grid container>
                            <Grid item lg={11} spin>
                                <Typography>
                                    {t('manager_name')}: {eventInfo?.manager?.name}
                                </Typography>
                            </Grid>
                            <Grid item lg={11}>
                                <Typography>
                                    {t('phone_number')}: {eventInfo?.manager?.phoneNumber}
                                </Typography>
                            </Grid>
                            <Grid item lg={11}>
                                <Typography>
                                    {t('email_address')}: {eventInfo?.manager?.email}
                                </Typography>
                            </Grid>
                            <Grid item lg={11}>
                                <Typography>
                                    {t('facebook')}: {eventInfo?.manager?.facebook}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Paper elevation={12}>
                <ChatRoom chatId={eventInfo?.chat} />
            </Paper>
            <Grid container spacing={2} justify="center">
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<ScanIcon />}
                        onClick={() => { setShowPopupScan(true) }}
                    >
                        {t('scan_ticket')}
                    </Button>
                </Grid>
                {eventInfo?.isAcceptGuestJoin && <Grid item>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        endIcon={<AddIcon />}
                        onClick={() => { setShowForm(true) }}
                    >
                        {t('register')}
                    </Button>
                </Grid>}
            </Grid>
        </>
    )
}

export default EventInfo;