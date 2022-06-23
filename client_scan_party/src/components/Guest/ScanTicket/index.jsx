import {
    Backdrop,
    Box,
    Grid,
    makeStyles,
    Modal,
    Paper,
    Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import {
    XCircle as CloseIcon,
    X as XIcon
} from 'react-feather'
import ScanCode from "../../ScanCode";
import deviceTestService from "../../DashBoard/DeviceTest/deviceTest.service";
import { useParams } from "react-router";
import moment from "moment";
import { Check } from 'react-feather';

const useStyles = makeStyles((theme) => ({
    
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: 'auto'
    },
    paper: {
        height: 'auto',
        backgroundColor: theme.palette.background.default
    },
    closeIcon: {
        '&:hover': {
            cursor: 'pointer'
        }
    },
    ModalHeader: {
        padding: theme.spacing(1),
        width: '100%',
        
    },
    modalContent: {
        padding: theme.spacing(1),
    },
    checkIcon: {
        backgroundColor: '#757de8',
        borderRadius: '50%'
    },
    XIcon: {
        backgroundColor: '#f50057',
        borderRadius: '50%'
    }
}));

export default function PopUpCheckTicket({ isShow, setShow }) {
    const classes = useStyles();
    const { eventId } = useParams();
    const [customerInfo, setInfoCustomer] = useState();
    const [isValid, setValid] = useState(false);
    const [init, setInit] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    async function scanTicket(data) {
        try {
            const res = await deviceTestService.scanTicket({ "value": data.text, "eventId": eventId });
            if (res?.data) {
                setValid(true);
                setInfoCustomer(res.data);
            }
        } catch (error) {
            setValid(false);
            setInfoCustomer();
            setErrorMessage(error.response.data.message);
        }
        setInit(false)
    }

    function handleClose() {
        setShow(false);
        setInit(true)
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isShow}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Paper
                in={isShow}
                className={classes.paper}
            >
                <Grid container>
                    <Grid item className={classes.ModalHeader} sm={12}>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" style={{ display: 'block' }}>Scan Ticket</Typography>
                            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
                        </Box>
                    </Grid>
                    <Grid item sm={12}>
                        <Paper elevation={3} className="p-1 m-1">
                            <Grid item sm={12}>
                                <ScanCode scanTicket={scanTicket} width={'100%'} height={'400px'} />
                            </Grid>
                            {!init && <Grid item sm={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Box style={{ textAlign: 'center' }}>
                                    {isValid ? <Check className={classes.checkIcon} /> : <XIcon className={classes.XIcon} />}
                                    {customerInfo?.info ?
                                        Object.keys(customerInfo.info).map((ele) => (
                                            <Typography>{`${ele}: ${customerInfo.info[ele]}`}</Typography>
                                        )) : <Typography>{errorMessage}</Typography>}
                                    {isValid && customerInfo && <Typography>Thời gian hết hạn: {customerInfo && moment(customerInfo.expirationDate).format("DD-MM-YYYY HH:mm")}</Typography>}
                                </Box>
                            </Grid>}
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </Modal>
    );
}
