import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Box, Paper, Grid, Link } from '@material-ui/core';
import ItemStep3 from './ItemStep3';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  paper: {
    minHeight: 300,
    padding: '1rem',
  },
  Typography: {
    fontSize: '1rem'
  },
  ticket: {
    minHeight: 300,
    padding: '1rem',
    color: 'white',
    textAlign: 'center',
    fontSize: '13px',
  },
  qrCode: {
    width: 64,
    height: 64
  }
}));

export default function Step4({ dataStep1, dataStep2, dataStep3, infoExcel }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Typography variant="h6" component="h3" gutterBottom>
        {t('check')}
      </Typography>
      <Box>
        <Grid container spacing={2}>
          <Grid item lg={4} xs={12}>
            <Paper className={classes.paper} elevation={12} >
              <Typography variant="h6" gutterBottom>
                <strong>
                  {t('event_info')}
                </strong>
              </Typography>
              <Typography variant="h6" className={classes.Typography}>
                <strong>{t('full_name')}</strong>: {dataStep1.name}
              </Typography>
              <Typography variant="h6" className={classes.Typography}>
                <strong>{t('address')}</strong>: {dataStep1.address}
              </Typography>
              <Typography variant="h6" className={classes.Typography}>
                <strong>{t('begin_time')}</strong>: {moment(dataStep1.beginTime).format("HH:mm DD-MM-YYYY")}
              </Typography>
              <Typography variant="h6" className={classes.Typography}>
                <strong>{t('end_time')}</strong>: {moment(dataStep1.endTime).format("HH:mm DD-MM-YYYY")}
              </Typography>
              <Typography variant="h6" className={classes.Typography}>
                <strong>{t('manager')}</strong>: {dataStep1.manager}
              </Typography>
              <Typography variant="h6" className={classes.Typography}>
                <strong>{t('company')}</strong>: {dataStep1.company}
              </Typography>
              <Typography variant="h6" className={classes.Typography}>
                <strong>{t('email')}</strong>: {dataStep1.email}
              </Typography>
              <Typography variant="h6" className={classes.Typography}>
                <strong>{t('facebook')}</strong>: {dataStep1.facebook}
              </Typography>
              <Typography variant="h6" className={classes.Typography}>
                <strong>{t('phone_number')}</strong>: {dataStep1.phoneNumber}
              </Typography>
            </Paper>
          </Grid>
          <Grid item lg={4} xs={12} >
            <Paper className={classes.paper} elevation={12} >
              <Typography variant="h6" component="h3" gutterBottom>
                <strong>
                  {t('list_guest')}
                </strong>
              </Typography>
              <Typography variant="h6" component="h3" gutterBottom>
                <Link href={infoExcel ? `${infoExcel.path}` : "#"} onClick={() => console.log('')}>
                  {t('file')}
                </Link>
              </Typography>
            </Paper>
          </Grid>
          <Grid item lg={4} xs={12}>
            <ItemStep3 data={dataStep3} dataStep1={dataStep1} />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}