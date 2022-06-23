import {
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import ChatRoomContent from "../../../ChatRoom/ChatRoomContent";
import eventService from "../eventService";
import EventDetailTable from "./EventDetailTable";
import RatingList from './RatingList'

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  titleHeader: {
    fontSize: 24,
  },
}));

function EventDetail() {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const { t } = useTranslation()

  const [detailEvent, setDetailEvent] = useState([]);

  useEffect(() => {
    getDetailEvent();
  }, []);

  async function getDetailEvent() {
    try {
      const res = await eventService.getDetailEvent(params.eventId);
      setDetailEvent(res);
    } catch (error) {
      toast(t(error.response.data.message));
    }
  }
  async function handleDelEvent() {
    try {
      const res = await eventService.delEvent(params.eventId);
      if (res) {
        toast(t(res.message));
        history.push("/");
      }
    } catch (error) {
      toast(t(error.response.data.message));
    }
  }



  return (
    <>
      <Box className={classes.root}>
        <Grid container spacing={2}>
          <Grid item lg={6} xs={12}>
            <Paper elevation={3} className="p-1">
              <Typography variant="h5">{t("event_info")}</Typography>
              <Grid container>
                <Grid item lg={11} spin>
                  <Typography>{t("event_name")}: {detailEvent.name}</Typography>
                </Grid>
                <Grid item lg={11}>
                  <Typography>{t("address")}: {detailEvent.address}</Typography>
                </Grid>
                <Grid item lg={11}>
                  <Typography>{t("organization")}: {detailEvent.company}</Typography>
                </Grid>
                <Grid item lg={11}>
                  <Typography>
                    {t("start_time")}:{" "}
                    {moment(detailEvent.time?.beginTime).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </Typography>
                </Grid>
                <Grid item lg={11}>
                  <Typography>
                    {t("end_time")}:{" "}
                    {moment(detailEvent.time?.endTime).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Paper elevation={3} className="p-1">
              <Typography variant="h5">{t("manager_info")}</Typography>
              <Grid container>
                <Grid item lg={11} spin>
                  <Typography>
                    {t("manager_name")}: {detailEvent.manager?.name}
                  </Typography>
                </Grid>
                <Grid item lg={11}>
                  <Typography>
                    {t("phone_number")}: {detailEvent.manager?.phoneNumber}
                  </Typography>
                </Grid>
                <Grid item lg={11}>
                  <Typography>
                    {t("email_address")}: {detailEvent.manager?.email}
                  </Typography>
                </Grid>
                <Grid item lg={11}>
                  <Typography>
                    {t("facebook")}: {detailEvent.manager?.facebook}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            <Paper elevation={3} className="p-1" style={{ marginTop: '1rem' }}>
              <RatingList data={detailEvent?.rating?.ratingList} />
            </Paper>
          </Grid>
          <Grid item lg={12} xs={12}>
            <Paper elevation={3} className="p-1">
              <Typography variant="h5">{t("ticket_and_guest_info")}</Typography>
              <EventDetailTable eventId={params.eventId} />
            </Paper>
          </Grid>
          <Grid item lg={12} xs={12}>
            <Paper elevation={3} className="p-1">
              <ChatRoomContent chatId={detailEvent?.chat} aliasName={"Quản trị viên"} />
            </Paper>
          </Grid>
          <Grid item lg={12} xs={12}>
            <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDelEvent}
              >
                {t("delete_event")}
            </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default EventDetail;
