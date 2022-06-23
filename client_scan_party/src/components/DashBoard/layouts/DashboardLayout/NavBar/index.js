import React, { useEffect } from 'react';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Avatar,
    Box,
    // Button,
    Divider,
    Drawer,
    Hidden,
    List,
    Typography,
    makeStyles,
    IconButton
} from '@material-ui/core';
import {
    // AlertCircle as AlertCircleIcon,
    // BarChart as BarChartIcon,
    // Lock as LockIcon,
    // Settings as SettingsIcon,
    // User as UserIcon,
    // UserPlus as UserPlusIcon,
    Home as ShoppingBagIcon,
    Users as UsersIcon,
    Airplay as AirplayIcon,
    FileMinus as FileIcon
} from 'react-feather';
import NavItem from './NavItem';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LoginHeader from '../../../../Login/LoginHeader';
import InputIcon from '@material-ui/icons/Input';
import { logOut } from '../../../../../stores/slices/authSlice';
import loginService from '../../../../Login/index.service';


const useStyles = makeStyles(() => ({
    mobileDrawer: {
        width: 256
    },
    desktopDrawer: {
        width: 256,
        top: 64,
        height: 'calc(100% - 64px)'
    },
    avatar: {
        cursor: 'pointer',
        width: 64,
        height: 64
    },
    logout: {
        display: 'flex',
        justifyContent: 'flex-start',
        padding: '16px',
        fontSize: '2rem'
    }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
    const classes = useStyles();
    const location = useLocation();
    const user = useSelector(state => state.auth.user);
    const { t } = useTranslation();

    // console.log(location.pathname);

    const items = [
        {
            href: '/',
            icon: ShoppingBagIcon,
            title: t('event')
        },
        {
            href: '/account',
            icon: UsersIcon,
            title: t('account')
        },
        {
            href: '/device-test',
            icon: AirplayIcon,
            title: t('device_test')
        },
        {
            href: '/store',
            icon: FileIcon,
            title: t('my_store')
        },

    ];

    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const dispatch = useDispatch();
    const history = useHistory();

    async function handleLogOut() {
        const refreshToken = JSON.parse(localStorage.getItem('refresh-token')) || '';
        dispatch(logOut())
        loginService.logOut({ refreshToken: refreshToken });
        history.push('/users/sign-in');
    }

    const content = (
        <Box
            height="100%"
            display="flex"
            flexDirection="column"
        >
            <Box
                alignItems="center"
                display="flex"
                flexDirection="column"
                p={2}
            >
                <Avatar
                    className={classes.avatar}
                    component={RouterLink}
                    src={user.avatar}
                    to="account"
                />
                <Typography
                    className={classes.name}
                    color="textPrimary"
                    variant="h5"
                    style={{ marginBottom: 20 }}
                >
                    {user.name}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    {user.email}
                </Typography>
            </Box>
            <Divider />
            <Box p={2}>
                <List>
                    {items.map((item, index) => (
                        <NavItem
                            href={item.href}
                            key={index}
                            title={item.title}
                            icon={item.icon}
                        />
                    ))}
                </List>
            </Box>
        </Box>
    );

    return (
        <>
            <Hidden lgUp>
                <Drawer
                    anchor="left"
                    classes={{ paper: classes.mobileDrawer }}
                    onClose={onMobileClose}
                    open={openMobile}
                    variant="temporary"
                >
                    <Box style={{ display: 'flex', justifyContent: 'center' }}>
                        <LoginHeader />
                    </Box>
                    {content}
                    <Box className={classes.logout}>
                        <IconButton color="inherit" onClick={handleLogOut}>
                            <InputIcon />	&nbsp;
                            <Typography>Log out</Typography>
                        </IconButton>
                    </Box>
                </Drawer>
            </Hidden>
            <Hidden mdDown>
                <Drawer
                    anchor="left"
                    classes={{ paper: classes.desktopDrawer }}
                    open
                    variant="persistent"
                >
                    {content}
                </Drawer>
            </Hidden>
        </>
    );
};

NavBar.propTypes = {
    onMobileClose: PropTypes.func,
    openMobile: PropTypes.bool
};

NavBar.defaultProps = {
    onMobileClose: () => { },
    openMobile: false
};

export default NavBar;
