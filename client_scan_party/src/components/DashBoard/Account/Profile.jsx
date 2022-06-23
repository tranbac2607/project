import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
    makeStyles,
    Input
} from '@material-ui/core';
import loginService from '../../Login/index.service';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { changeUser } from '../../../stores/slices/authSlice';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(() => ({
    root: {},
    avatar: {
        height: 100,
        width: 100
    },
    name: {
        marginTop: 10
    }
}));

const Profile = () => {
    const classes = useStyles();
    const initUser = { ...JSON.parse(localStorage.getItem('user')) };
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [user, setUser] = useState(initUser);

    async function handleChange(e) {
        const file = e.target.files[0]
        let fd = new FormData();
        fd.append("image", file)
        fd.append("email", user.email)
        try {
            const res = await loginService.changeAvatar(fd);
            if (res) {
                localStorage.setItem('user', JSON.stringify(res.user))
                setUser({ ...JSON.parse(localStorage.getItem('user')) })
                dispatch(changeUser())
                toast(t(res.message))
            }
        } catch (error) {
            toast(t(error.response.data.message))
        }
    }

    return (
        <Card elevation={9}>
            <CardContent>
                <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                >
                    <Avatar
                        className={classes.avatar}
                        src={user.avatar}
                    />
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h4"
                        align="center"
                        className={classes.name}
                    >
                        {`${user.firstName} ${user.lastName}`}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body1"
                    >
                        {t('join_date')}
                    </Typography>
                    <Typography
                        className={classes.dateText}
                        color="textSecondary"
                        variant="body1"
                    >
                        {`${moment(user.date).format('MMMM Do YYYY, h:mm:ss a')}`}
                    </Typography>
                </Box>
            </CardContent>
            <Divider />
            <CardActions style={{ justifyContent: "center" }}>
                <Box htmlFor="upload-photo" component="label">
                    <Button color="primary" variant="text" component="span" fullWidth>
                        {t('upload_button')}
                    </Button>
                    <input
                        style={{ display: 'none' }}
                        id="upload-photo"
                        type="file"
                        onChange={handleChange}
                    />
                </Box>
            </CardActions>
        </Card>
    );
};

Profile.propTypes = {
    className: PropTypes.string
};

export default Profile;
