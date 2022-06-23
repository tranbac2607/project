import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { makeStyles, Paper } from '@material-ui/core';

import SystemAlert from '../../../SystemAlert';
import Account from '../../Account';
import DeviceTest from '../../DeviceTest';
import Event from '../../Event'
import ActiveLive from '../../Event/ActiveLive';
import EventDetail from '../../Event/EventDetail';
import Store from '../../Store'
import '../../../../assets/scss/index.scss';
import Admin from '../../../Admin';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        padding: '24px 0',
        minHeight: '100vh'
    },
}));

function Main() {
    const classes = useStyles();
    let { path } = useRouteMatch();
    return (
        <Paper className={classes.root}>
            <SystemAlert />
            <Switch>
                <Route path='/admin'>
                    <Admin />
                </Route>
                <Route path={`${path}event/:eventId/active-live`} >
                    <ActiveLive />
                </Route>
                <Route path={`${path}event/:eventId`} >
                    <EventDetail />
                </Route>
                <Route path={`${path}`} exact>
                    <Event />
                </Route>
                <Route path={`${path}account`} >
                    <Account />
                </Route>
                <Route path={`${path}device-test`}>
                    <DeviceTest />
                </Route>
                <Route path={`${path}store`} >
                    <Store />
                </Route >
            </Switch >
        </Paper >
    )
}

export default Main;