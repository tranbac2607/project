import { Box, Button, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import GuestTopBar from './GuestTopBar';
import EventInfo from './EventInfo';
import PopUpCheckTicket from './ScanTicket';
import GuestForm from './GuestForm';

const useStyles = makeStyles(({
    root: {},
    content: {
        marginTop: '64px'
    },
    headerImage: {
        width: '100%',
        height: '300px',
        objectFit: 'cover',
        borderRadius: '8px'
    }
}));

function Guest() {
    const classes = useStyles();
    const [isShowPopupScan, setShowPopupScan] = useState(false);
    const [isShowForm, setShowForm] = useState(true);
    return (
        <Paper>
            <GuestTopBar />
            {isShowPopupScan && <PopUpCheckTicket isShow={isShowPopupScan} setShow={setShowPopupScan} />}
            <Container maxWidth="md" className={classes.content}>
                <Box>
                    <img
                        src="https://vnn-imgs-f.vgcloud.vn/2020/03/26/19/huong-dan-su-dung-zoom-meeting-tren-dien-thoai.jpg"
                        className={classes.headerImage}
                        alt='rating and register'
                    />
                </Box>
                {isShowForm ? <GuestForm onBack={() => { setShowForm(false) }} /> : <EventInfo setShowForm={setShowForm} />}
            </Container>
        </Paper>
    )
}

export default Guest;