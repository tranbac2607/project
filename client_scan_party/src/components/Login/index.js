import React from 'react'
import { Grid, Box, Button, Paper, AppBar, Toolbar, Hidden } from '@material-ui/core';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import LoginIntro from './LoginIntro';
import LoginHeader from './LoginHeader';
import ForgotPassword from './ForgotPassword/index';
import LoginForm from './Login/index';
import SignUp from './SignUp';
import LoginIcon from '../../assets/images/logo-2.png';
import { Link as RouterLink } from 'react-router-dom';

function Login() {
    let { path } = useRouteMatch();
    return (
        <>
            <AppBar
                elevation={0}
            >
                <Toolbar>
                    <RouterLink to="/">
                        <img src={LoginIcon} alt="logo" style={{ height: '50px' }} />
                    </RouterLink>
                    <Box flexGrow={1} />
                    <Hidden>
                        <LoginHeader />
                    </Hidden>
                </Toolbar>
            </AppBar>
            <Paper className="login">
                <Grid container >
                    <Grid item md={6} xs={0}>
                        <LoginIntro />
                    </Grid>
                    <Grid item md={6} xs={12} style={{marginTop: '64px'}}>
                        <Switch>
                            <Route exact path={`${path}/sign-in`} component={LoginForm} />
                            <Route path={`${path}/sign-up`} component={SignUp} />
                            <Route path={`${path}/forgot-password`} component={ForgotPassword} />
                        </Switch>
                    </Grid>
                </Grid>
            </Paper >
        </>
    )
}

export default Login

