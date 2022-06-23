import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Hidden,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import LoginHeader from '../Login/LoginHeader';
import Logo from '../../assets/images/logo-2.png'

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

const GuestTopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <img src={Logo} alt="logo" style={{height: '50px'}}/>
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden>
          <LoginHeader />
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

GuestTopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default GuestTopBar;
