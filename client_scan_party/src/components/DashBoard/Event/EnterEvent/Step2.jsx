import React from 'react';
import {
  Box,
  Button,
  Grid,
  makeStyles,
  Typography,
  TextField,
  FormControlLabel
} from '@material-ui/core';
import BackupIcon from '@material-ui/icons/Backup';
import PanToolIcon from '@material-ui/icons/PanTool';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { useTranslation } from 'react-i18next';
import readXlsxFile from 'read-excel-file';
import _ from 'lodash'
import eventService from '../eventService';
import { toast } from 'react-toastify';
import { Upload, Check } from 'react-feather';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  uploadButton: {
    marginBottom: theme.spacing(3)
  },
  checkIcon: {
    padding: '5px',
    backgroundColor: '#757de8',
    borderRadius: '50%',
  }
}));

export default function Step2({ handleUpload, dataStep2 }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [showIconSuccess, setShowIconSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  async function readFileExcel(e) {
    const file = e.target.files[0];
    const item = await uploadFileExcel(file);
    readXlsxFile(file).then((rows) => {
      const keys = rows.shift();
      if (keys.some(ele => ele === 'email') && keys.some(ele => ele === 'name')) {
        const data = rows.map((element) => _.zipObject(keys, element));
        handleUpload(data, { ...item });
        setShowIconSuccess(true);
        setError('')
      } else {
        setShowIconSuccess(false);
        setError('must_have_email_and_name')
      }
    })
  }

  async function uploadFileExcel(file) {
    const user = JSON.parse(localStorage.getItem('user'));
    let fd = new FormData();
    fd.append("file", file);
    fd.append("id", user?._id);
    fd.append("type", "excel")
    try {
      const res = await eventService.uploadFileExcel(fd);
      if (res) {
        toast(t(res.message));
        return res.data
      }
    } catch (error) {
      toast(t(error.response.data.message))
    }
  }

  return (
    < React.Fragment >
      <Typography variant="h6">
        {t('guest_info')}
      </Typography>
      <Typography variant="h6" style={{ marginBottom: '1rem' }}>{t('must_have_email_and_name')}</Typography>
      <Box style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        {(showIconSuccess || dataStep2) &&
          <Check className={classes.checkIcon} size="32px" />}
      </Box>
      <Box style={{ display: 'flex', justifyContent: 'center' }}>
        <Box htmlFor="upload-photo" component="label">
          <Button color="primary" variant="contained" component="span" className={classes.uploadButton}>
            <Upload /> {t('upload_excel_file')}
          </Button>
          <input
            style={{ display: 'none' }}
            id="upload-photo"
            type="file"
            accept=".xlsx"
            onChange={readFileExcel}
          />
        </Box>
      </Box>
      {(error) && <Alert severity="error">{error}</Alert>}
    </React.Fragment >
  );
}