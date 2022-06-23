import { Button, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { FastField, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { CornerUpLeft as BackIcon } from 'react-feather'
import { SPCheckBox, SPTextField } from '../../form_field';
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import eventService from '../../DashBoard/Event/eventService';
import { toast } from 'react-toastify';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(({
    root: {},
    content: {
        marginTop: '64px'
    },
    headerImage: {
        width: '100%',
        height: '300px',
        objectFit: 'cover',
        borderRadius: '8px'
    },
    form: {
        maxWidth: '400px'
    }
}));

function GuestForm({ onBack }) {
    const { t } = useTranslation();
    const classes = useStyles();
    const { eventId } = useParams();
    const [resMessage, setResMessage] = useState();
    const [isError, setIsError] = useState(false)

    async function handleSubmit(value, { resetForm }) {
        try {
            const data = { ...value }
            const res = await eventService.userRegisterForm(eventId, data);
            if (res) {
                toast(t(res.message))
                setResMessage(res.message)
                setIsError(false)
            }
        } catch (error) {
            setResMessage(error.response.data.message);
            setIsError(true)
            toast(t(error.response.data.message))
        }
        resetForm({})
    }
    return (
        <Container>
            <Paper elevation={3} className="p-1 m-1">
                <Typography variant="h5">{t(`register_form`)}</Typography>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Formik
                        initialValues={{ name: '', gender: '', email: '', phoneNumber: '', address: '', confirm: false }}
                        onSubmit={handleSubmit}
                        validationSchema={Yup.object({
                            name: Yup.string().required('required'),
                            gender: Yup.string().required('required'),
                            email: Yup.string().required('required').email(),
                            phoneNumber: Yup.string()
                                .required('required'),
                            address: Yup.string()
                                .required('required'),
                            confirm: Yup.bool().required('required')
                        })}

                    >
                        {formikProps => {
                            const { isValid, touched, isSubmitting } = formikProps;
                            return (
                                <Form className={classes.form}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12}>
                                            <FastField
                                                name="name"
                                                component={SPTextField}
                                                type="text"
                                                variant="outlined"
                                                label="full_name"
                                                autoFocus
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <FastField
                                                name="gender"
                                                component={SPTextField}
                                                type="text"
                                                variant="outlined"
                                                label="gender"
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <FastField
                                                name="email"
                                                component={SPTextField}
                                                type="email"
                                                variant="outlined"
                                                label="email"
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FastField
                                                name="phoneNumber"
                                                component={SPTextField}
                                                type="text"
                                                variant="outlined"
                                                label="phone_number"
                                                autoComplete="phone_number"
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FastField
                                                name="address"
                                                component={SPTextField}
                                                type="text"
                                                variant="outlined"
                                                label="address_guest"
                                                autoComplete="address"
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FastField
                                                name='confirm'
                                                component={SPCheckBox}
                                                label='Confirm'
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} justifyContent="center">
                                        <Grid item xs={12} style={{ wordBreak: 'break-all' }}>
                                            {(resMessage) && <Alert severity={isError ? "error" : "success"}>{t(resMessage)}</Alert>}
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        disabled={!isValid || isSubmitting}
                                    >
                                        {t('sign_up')}
                                    </Button>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </Paper>
            <Grid container >
                <Grid item>
                    <Button
                        variant="contained"
                        color="secondary"
                        endIcon={<BackIcon />}
                        onClick={onBack}
                        style={{ marginBottom: '1rem' }}
                    >
                        {t('back')}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default GuestForm;