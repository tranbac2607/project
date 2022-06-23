import { Box, Button, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import eventService from '../../eventService';
import clover from '../../../../../assets/images/clover.png';
import {
    XCircle as CloseIcon
} from 'react-feather';
import { useTranslation } from 'react-i18next';

function Lucky({setShowPopupMiniGame}) {
    const { eventId } = useParams();
    const [luckyPerson, setLuckyPerson] = useState();
    const {t} = useTranslation()

    async function getLuckyPerson() {
        try {
            const res = await eventService.getLuckyPerson(eventId)
            if (res) {
                setLuckyPerson(res)
            }
        } catch (error) {
            toast(t(error.response.data.message))
        }
    }

    return (
        <Box>
            <Grid container justifyContent="center" alignItems="center" style={{position: 'relative'}}>
                <img src={clover} style={{ width: '32px', height: '32px' }} />
                <Typography variant="h5" >Lucky</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setShowPopupMiniGame(true)}
                    style={{ height: '20px', position: "absolute", right: '0' }}
                >
                    Change
                </Button>
            </Grid>
            <Box style={{ textAlign: 'center' }}>
                <Typography variant="h5" >Người may mắn: {luckyPerson?.info?.name}</Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => getLuckyPerson()}
                >
                    Tìm người may mắn
                </Button>
            </Box>
        </Box >
    )
}

export default Lucky;