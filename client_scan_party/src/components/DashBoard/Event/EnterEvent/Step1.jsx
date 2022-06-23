import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Formik, Form, FastField } from 'formik';
import * as Yup from 'yup';
import { SPCheckBox, SPDatePicker, SPEditor, SPTextField } from '../../../form_field';
import { Box, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export default function Step1({ data, handleSubmit }) {
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                {t('event_info')}
            </Typography>
            <Formik
                initialValues={{ ...data } || {}}
                onSubmit={value => handleSubmit(value)}
                validationSchema={Yup.object({
                    name: Yup.string().required('required'),
                    beginTime: Yup.date().required('required'),
                    endTime: Yup.date().min(Yup.ref('beginTime'), "end_date_must_be_grater_than_start_date").required('required'),
                    address: Yup.string().required('required'),
                    company: Yup.string().required('required'),
                    manager: Yup.string().required('required'),
                    phoneNumber: Yup.string().required('required').matches(/^[0-9]+$/, 'wrong_format_number'),
                })}
            >
                {props => {
                    const { isValid, touched, isSubmitting, isFocus } = props;
                    return (
                        <Form noValidate>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12}>
                                    <FastField
                                        name='name'
                                        component={SPTextField}
                                        type='text'
                                        required
                                        fullWidth
                                        label='event_name'
                                        autoComplete="eventName"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid item xs={12} sm={12}>
                                        <FastField
                                            name='beginTime'
                                            component={SPTextField}
                                            type="datetime-local"
                                            required
                                            fullWidth
                                            label='begin_time'
                                            // mat-datepicker={<div>hello again</div>}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid item xs={12} sm={12}>
                                        <FastField
                                            name='endTime'
                                            component={SPTextField}
                                            type="datetime-local"
                                            required
                                            fullWidth
                                            label='end_time'
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <FastField
                                        name='address'
                                        component={SPTextField}
                                        type='text'
                                        required
                                        fullWidth
                                        label={'address'}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FastField
                                        name='company'
                                        component={SPTextField}
                                        type='text'
                                        required
                                        fullWidth
                                        label='company'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FastField
                                        name='manager'
                                        component={SPTextField}
                                        type='text'
                                        required
                                        fullWidth
                                        label='manager'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FastField
                                        name='phoneNumber'
                                        component={SPTextField}
                                        type='text'
                                        required
                                        fullWidth
                                        label='phone_number'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FastField
                                        name='email'
                                        component={SPTextField}
                                        type='text'
                                        fullWidth
                                        label='email'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FastField
                                        name='facebook'
                                        component={SPTextField}
                                        type='text'
                                        fullWidth
                                        label='facebook'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FastField
                                        name='description'
                                        component={SPEditor}
                                        required
                                        fullWidth
                                        label='Description'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FastField
                                        name='isAcceptGuestJoin'
                                        component={SPCheckBox}
                                        required
                                        fullWidth
                                        label={t('accept_guest_join')}
                                    />
                                </Grid>
                            </Grid>
                            <Box style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                                <Button type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={!isValid}
                                >
                                    {t('next')}
                                </Button>
                            </Box>
                        </Form>
                    )
                }}
            </Formik>
        </React.Fragment >
    );
}