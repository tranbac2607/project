import { makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ScanCode from '../../ScanCode';
import deviceTestService from './deviceTest.service';

const useStyles = makeStyles((theme) => ({
    root: {
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(3),
        padding: theme.spacing(3),
    },
}));

export default function DeviceTest() {
    const classes = useStyles();
    const { t } = useTranslation()

    async function scanTicket(data) {
        try {
            const res = await deviceTestService.scanTicket({ value: data.text });
            if (res) {
                toast(t(res.message))
            }
        } catch (error) {
            toast(t(error.response.data.message))
        }
    }

    return (
        <>
            <Paper elevation={24} className={classes.root} >
                <ScanCode width={'100%'} height={'80vh'} scanTicket={scanTicket} />
            </Paper>
        </>
    )
}