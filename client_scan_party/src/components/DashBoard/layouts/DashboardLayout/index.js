import React, { useState, useEffect } from 'react';
import { Box, makeStyles, Paper, Grid } from '@material-ui/core';
import { Route, Switch, useRouteMatch, useHistory } from 'react-router-dom';

import NavBar from './NavBar';
import TopBar from './TopBar';
import Main from './Main';
import Admin from '../../../Admin';
import guestService from '../../../Guest/index.service';
import NoDataImage from '../../../../assets/images/nodata.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        width: '100%'
    },
    wrapper: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden',
        paddingTop: 64,
        [theme.breakpoints.up('lg')]: {
            paddingLeft: 256
        }
    },
    wrapper2: {
        isplay: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden',
        paddingTop: 64,
        [theme.breakpoints.up('lg')]: {
            padding: 100
        }
    },
    contentContainer: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden'
    },
    content: {
        flex: '1 1 auto',
        height: '100%',
        overflow: 'auto'
    }
}));

const DashboardLayout = () => {
    const history = useHistory();
    const classes = useStyles();
    const [isMobileNavOpen, setMobileNavOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [userDetails, setUserDetails] = useState('');

    const getAllUsers = async () => {
        try {
            const res = await guestService.getAllUser();
            if (res) {
                setUsers(res.users);
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const getUserDetails = async () => {
        try {
            const res = await guestService.getUserDetails();
            setUserDetails(res.user.role);
        }
        catch (error) {
            history.push('/users/sign-in');
        }
    };

    useEffect(() => {
        getAllUsers();
        getUserDetails();
    }, [])


    return (
        <Paper className={classes.root}>
            <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
            {userDetails === 'user'
                &&
                <NavBar
                    onMobileClose={() => setMobileNavOpen(false)}
                    openMobile={isMobileNavOpen}
                />
            }
            {users?.length === 0
                ? <Grid container justify="center">
                    <Grid item>
                        <img src={NoDataImage}
                            alt='nodata'
                            style={{
                                marginTop: 50,
                                display: 'inline-block',
                                maxWidth: '100%',
                                width: 560
                            }} />
                    </Grid>
                </Grid>
                : <Box className={userDetails === 'user' ? classes.wrapper : classes.wrapper2}>
                    <Box className={classes.contentContainer}>
                        <Box className={classes.content}>
                            <Main />
                        </Box>
                    </Box>
                </Box>
            }
        </Paper>
    );
};

export default DashboardLayout;
