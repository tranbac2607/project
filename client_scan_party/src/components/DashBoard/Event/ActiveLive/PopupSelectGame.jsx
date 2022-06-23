import {
    Backdrop,
    Box,
    Fade,
    Grid,
    makeStyles,
    Modal,
    Paper,
    Typography,
} from "@material-ui/core";
import React from 'react';
import {
    XCircle as CloseIcon
} from 'react-feather';
import clover from '../../../../assets/images/clover.png';
import foul from '../../../../assets/images/foul.png';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: "white",
        //   width: "300px",
        //   height: "300px"
    },
    closeIcon: {
        '&:hover': {
            cursor: 'pointer'
        }
    },
    ModalHeader: {
        padding: theme.spacing(1),
        width: '100%'
    },
    modalContent: {
        padding: theme.spacing(1),
    },
    miniGameItem: {
        margin: '1rem',
        padding: '1rem',
        '&:hover': {
            cursor: 'pointer'
        }
    }
}));

function PopupSelectGame({ isShow, setShow, onSelectMiniGame }) {
    const classes = useStyles();

    function handleClose() {
        setShow(false);
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
                    <Grid item className={classes.ModalHeader}>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" style={{ display: 'block' }}>Mini game</Typography>
                            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
                        </Box>
                    </Grid>
                    <Grid item sm={12} className={classes.modalContent}>
                        <Grid container>
                            <Grid item sm={6}>
                                <Paper elevation={3} className={classes.miniGameItem} onClick={() => {onSelectMiniGame(1)}}>
                                    <Grid container justifyContent="center" alignItems="center">
                                        <Grid item sm={2}>
                                            <img src={clover} style={{ width: '32px', height: '32px' }} />
                                        </Grid>
                                        <Grid item sm={10}>
                                            <Typography variant="h5">Quay số may mắn</Typography>
                                            <Box >

                                                Quay số may mắn
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item sm={6}>
                                <Paper elevation={3} className={classes.miniGameItem} onClick={() => {onSelectMiniGame(2)}}>
                                    <Grid container justifyContent="center" alignItems="center">
                                    <Grid item sm={2}>
                                        <img src={foul} style={{ width: '32px', height: '32px' }} />
                                    </Grid>
                                    <Grid item sm={10}>
                                        <Typography variant="h5">Quay số may mắn</Typography>
                                        <Box >

                                            Quay số may mắn
                                            </Box>
                                    </Grid>
                                </Grid>
                                </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                </Grid>
            </Paper>
        </Modal >
    )
}

export default PopupSelectGame;