import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { Check } from 'react-feather';
import moment from 'moment'
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        position: 'relative',
        minHeight: 300,
        padding: '1rem',
        color: 'white',
        textAlign: 'center',
        fontSize: '13px',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    control: {
        padding: theme.spacing(2),
    },
    qrCode: {
        width: 64,
        height: 64
    },
    checkIcon: {
        position: 'absolute',
        top: '5px',
        right: '5px',
        marginLeft: '1rem',
        backgroundColor: '#757de8',
        borderRadius: '50%',
        padding: '5px'
    }
}));

export default function ItemStep3({ data, selected, handleSelect, dataStep1 }) {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <>
            <Paper className={classes.paper} elevation={selected && selected._id === data._id ? 12 : 3} onClick={() => { handleSelect && handleSelect(data) }}
                style={{ backgroundImage: `url("${data.backgroundUrl}")` }}>
                <Box >
                    {selected && selected._id === data._id && <Check className={classes.checkIcon} size={32}/>}
                    <Typography variant="p" gutterBottom>
                        {t('event')}
                    </Typography>
                    <Typography component="h3" gutterBottom>
                        {`${dataStep1 && dataStep1.name}`}
                    </Typography>
                    <Typography variant="p" gutterBottom>
                        {t('address')}
                    </Typography>
                    <Typography component="p" gutterBottom>
                        {`${dataStep1 && dataStep1.address}`}
                    </Typography>
                    <Typography variant="p" gutterBottom>
                        {t('time')}
                    </Typography>
                    <Typography>
                        {moment(dataStep1?.beginTime).format('HH:mm DD-MM-YYYY')}
                    </Typography>
                    <Typography variant="p">
                        {t('to')}
                    </Typography>
                    <Typography>
                        {moment(dataStep1?.endTime).format('HH:mm DD-MM-YYYY')}
                    </Typography>
                    <Typography gutterBottom>
                        {t('welcome')}
                    </Typography>
                    <img className={classes.qrCode} src="https://vi.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/basic_market/generator/dist/generator/assets/images/websiteQRCode_noFrame.png" alt="qrcode"></img>
                </Box>
            </Paper>
        </>
    )
}