import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link as LinkUi } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import { useRouteMatch, Link } from 'react-router-dom';
import loginService from '../index.service';
import Alert from '@material-ui/lab/Alert';
import { FastField, Form, Formik } from 'formik';
import { SPCheckBox, SPTextField } from '../../form_field';
import { toast } from 'react-toastify'
import * as Yup from 'yup';

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp({ setMode }) {
    const classes = useStyles();
    const { t } = useTranslation();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    async function handleSubmit(data) {
        try {
            const res = await loginService.signUp(data);
            setMessage(res.message)
            setError('')
        } catch (error) {
            setMessage('')
            setError(error.response.data.message)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t('sign_up')}
                </Typography>
                <Formik
                    initialValues={{ email: '', firstName: '', lastName: '', password: '', confirmPassword: '', emailMarketing: false }}
                    onSubmit={(values) => {
                        handleSubmit(values);
                    }}
                    validationSchema={Yup.object().shape({
                        firstName: Yup.string().required('required'),
                        lastName: Yup.string().required('required'),
                        email: Yup.string().required('required').email(),
                        password: Yup.string()
                            .required('required')
                            .min(8, 'password_minimum_8_character')
                            .matches(/[A-Z]/g, 'must_have_1_upper'),
                        confirmPassword: Yup.string()
                            .required('required')
                            .min(8, 'minimum_8_char')
                            .oneOf([Yup.ref('password')], 'password_must_be_the_same'),
                    })}
                >
                    {({ errors, touched }) => {
                        return (
                            <Form className={classes.form}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <FastField
                                            name="firstName"
                                            component={SPTextField}
                                            type="text"
                                            variant="outlined"
                                            label="first_name"
                                            autoFocus
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FastField
                                            name="lastName"
                                            component={SPTextField}
                                            type="text"
                                            variant="outlined"
                                            label="last_name"
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FastField
                                            name="email"
                                            component={SPTextField}
                                            type="email"
                                            variant="outlined"
                                            label="email_address"
                                            autoComplete="email"
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FastField
                                            name="password"
                                            component={SPTextField}
                                            type="password"
                                            variant="outlined"
                                            label="password"
                                            // autoComplete="email"
                                            fullWidth
                                            required
                                            autoComplete="current-password"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FastField
                                            name="confirmPassword"
                                            component={SPTextField}
                                            type="password"
                                            variant="outlined"
                                            label="confirm_password"
                                            fullWidth
                                            required
                                            autoComplete="current-password"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FastField
                                            name='emailMarketing'
                                            component={SPCheckBox}
                                            label='email_marketing'
                                        />
                                    </Grid>
                                </Grid>
                                {errors.firstName && touched.firstName && <Alert severity="error">{t(errors.firstName)}</Alert>}                                 
                                {errors.lastName && touched.lastName && <Alert severity="error">{t(errors.lastName)}</Alert>}                                 
                                {errors.password && touched.password && <Alert severity="error">{t(errors.password)}</Alert>}                                 
                                {errors.confirmPassword && touched.confirmPassword && <Alert severity="error">{t(errors.confirmPassword)}</Alert>}          
                                {error &&  <Alert severity="error">{t(error)}</Alert>}          
                                {(message) && <Alert severity="success">{t(message)}</Alert>}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    {t('sign_up')}
                                </Button>
                            </Form>
                        )
                    }}
                </Formik>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link to={`sign-in`}>
                            <LinkUi variant="body2">
                                {t('already_have_an_account')}
                            </LinkUi>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container >
    );
}