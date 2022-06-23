import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { FastField, Form, Formik } from 'formik';
import { SPTextField } from '../../../form_field';
import { BottomNavigation, BottomNavigationAction, Button, Paper, Box, makeStyles } from '@material-ui/core';
import BackupIcon from '@material-ui/icons/Backup';
import PanToolIcon from '@material-ui/icons/PanTool';
import ListAltIcon from '@material-ui/icons/ListAlt';
import eventService from '../eventService';
import { toast } from 'react-toastify';
import ItemStep3 from './ItemStep3';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 300,
    padding: '2rem',
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
  }
}));

export default function Step3({ dataStep1, dataStep2, dataStep3, setDataSet3 }) {
  const classes = useStyles();
  const {t} = useTranslation()
  const guestData = dataStep2 ? dataStep2[0] : {};
  const [listTemplate, setListTemplate] = React.useState([]);
  
  React.useEffect(() => {
    getListTemplate()
  }, [])

  async function getListTemplate () {
    try {
      const res = await eventService.getListTemplate();
      setListTemplate(res);
      setDataSet3(dataStep3 || res[0])
    } catch (error) {
      toast(t(error.response.data.message))
    }
  }

  return (
    < React.Fragment >
      <Typography variant="h6" gutterBottom>
        {t('create_ticket')}
    </Typography>
      <Box>
        <Grid container spacing={2}>
          {listTemplate.map(ele => (
            <Grid item lg={3} xs={12}>
            <ItemStep3 key={ele.id} data={ele} selected={dataStep3} handleSelect={setDataSet3} dataStep1={dataStep1} />
            </ Grid>
          ))}
        </Grid>
      </Box>
    </React.Fragment >
  );
}