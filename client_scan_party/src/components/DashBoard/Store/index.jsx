import { AppBar, makeStyles, Paper, Tab, Tabs, Grid, Box } from '@material-ui/core';
import React, { useEffect } from 'react';
import ScanCode from '../../ScanCode';
import StoreItem from './StoreItem';
import Pagination from '@material-ui/lab/Pagination';
import storeService from './storeService';
import { toast } from 'react-toastify';
import ItemImage from './ItemImage';
import ListExcel from './ListExcel';
import ListImage from './ListImage';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    root: {
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(3),
        padding: theme.spacing(3),
    },
    tab: {
        marginBottom: theme.spacing(2)
    },
    pagination: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

export default function Store() {
    const classes = useStyles();
    const [viewMode, setViewMode] = React.useState(0);
    const user = JSON.parse(localStorage.getItem('user'));
    const {t} = useTranslation()

    return (
        <Paper elevation={24} className={classes.root} >
            <Grid container className={classes.tab}>
                <Grid item lg={6} xs={12}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={viewMode}
                            onChange={(event, newValue) => { setViewMode(newValue) }}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            aria-label="store"
                        >
                            <Tab label={t('excel_file')} {...a11yProps(0)} />
                            <Tab label={t('image_file')} {...a11yProps(0)} />
                        </Tabs>
                    </AppBar>
                </Grid>
            </Grid>
            {viewMode === 0
                ? <ListExcel userId={user._id} />
                : <ListImage userId={user._id} />}

        </Paper>
    )
}