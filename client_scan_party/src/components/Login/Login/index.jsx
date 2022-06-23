import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link as LinkUi } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { FastField, Form, Formik } from 'formik';
import { SPCheckBox, SPTextField } from '../../form_field';
import loginService from '../index.service';
import * as Yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';
import { signIn } from '../../../stores/slices/authSlice';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function LoginForm(props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const [error, setError] = useState('');
    const history = useHistory()
    const dispatch = useDispatch();

    async function handleSubmit(data) {
        try {
            const res = await loginService.signIn(data);

            if (res) {
                localStorage.setItem('access-token', res.accessToken);
                localStorage.setItem('refresh-token', res.refreshToken);
                localStorage.setItem('user', JSON.stringify(res.user));
                dispatch(signIn());
                if (res.user.role === 'admin') {
                    history.push('/admin');
                    return;
                }
                history.push('/');
                setError('');
            }
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t('sign_in')}
                </Typography>
                <Formik
                    initialValues={{ email: '', password: '', remember: false }}
                    onSubmit={value => handleSubmit(value)}
                    validationSchema={Yup.object({
                        email: Yup.string().required('required'),
                        password: Yup.string()
                            .required('required')
                    })}
                >
                    {formikProps => {
                        const { isValid, touched, isSubmitting, isFocus } = formikProps;
                        return (
                            <Form className={classes.form} noValidate>
                                <FastField
                                    name='email'
                                    component={SPTextField}
                                    type='text'
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label='email_address'
                                    autoComplete="email"
                                    autoFocus
                                />
                                <FastField
                                    name='password'
                                    component={SPTextField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label='password'
                                    type="password"
                                    autoComplete="current-password"
                                />
                                <FastField
                                    name='remember'
                                    component={SPCheckBox}
                                    label='remember_me'
                                />
                                {(error) && <Alert severity="error">{t(error)}</Alert>}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    disabled={!isValid || isSubmitting}
                                >
                                    {t('sign_in')}
                                </Button>
                            </Form>
                        )
                    }}
                </Formik>
                <Grid container>
                    <Grid item xs>
                        <Link to={`forgot-password`}>
                            <LinkUi variant="body2">
                                {t('forgot_password')}
                            </LinkUi>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to={`sign-up`}>
                            <LinkUi variant="body2">
                                {t('dont_have_an_account')}
                            </LinkUi>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}