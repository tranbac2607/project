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
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import eventService from "../eventService";
import {
  XCircle as CloseIcon
} from 'react-feather'
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
    width: "300px",
    height: "300px"
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
  }
}));

export default function ModalGuestInfo({ isShow, setShow, ticketId }) {
  const classes = useStyles();
  const [customerInfo, setCustomerInfo] = useState({});
  const {t} = useTranslation()
  useEffect(() => {
    isShow && getGuestByTicket(ticketId);
  }, [isShow]);

  async function getGuestByTicket(ticketId) {
    try {
      const res = await eventService.getGuestByTicket(ticketId);
      res && setCustomerInfo(res);
    } catch (error) {
      toast(t(error.response.data.message));
    }
  }

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
        style={{ backgroundColor: "white", width: "300px", height: "300px" }}
        className={classes.paper}
      >
        <Grid container>
          <Grid item className={classes.ModalHeader}>
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" style={{ display: 'block' }}>Customer Info</Typography>
              <CloseIcon className={classes.closeIcon} onClick={handleClose}/>
            </Box>
          </Grid>
          <Grid item className={classes.modalContent}>
            {customerInfo?.info &&
              Object.keys(customerInfo.info).map((ele) => (
                <Typography>{`${ele}: ${customerInfo.info[ele]}`}</Typography>
              ))}
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
}
