import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
} from '@material-ui/core';
import { FastField, Formik, Form } from 'formik';
import { SPTextField } from '../../form_field';
import * as Yup from 'yup'
import loginService from '../../Login/index.service';
import {toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ChangePassword = ({ className, ...rest }) => {
    const [error, setError] = useState('');
    const {t} = useTranslation();
    async function handleSubmit(values) {
        const user = JSON.parse(localStorage.getItem('user'))
        const data = { ...values, email: user.email };
        try {
            const res = await loginService.changePassword(data);
            toast(t(res.message));
            setError('')
        } catch (error) {
            setError(error.response.data.message)
        }
    }
    return (
        <Card elevation={9}>
            <CardHeader
                subheader={t("change_password_regularly_for_added_security")}
                title={t("change_password")}
            />
            <Divider />
            <CardContent>
                <Formik
                    initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
                    onSubmit={value => handleSubmit(value)}
                    validationSchema={Yup.object({
                        currentPassword: Yup.string()
                            .min(8, 'password_minimum_8_character')
                            .required('required')
                            .matches(/(?=.*[A-Z])/, 'must_have_1_upper'),
                        newPassword: Yup.string()
                            .min(8, 'password_minimum_8_character')
                            .required('required')
                            .matches(/(?=.*[A-Z])/, 'must_have_1_upper'),
                        confirmPassword: Yup.string()
                            .min(8, 'minimum_8_char')
                            .required('required')
                            .oneOf([Yup.ref('newPassword')], 'password_must_be_the_same'),
                    })}
                >
                    {formikProps => {
                        const { isValid, touched, isSubmitting } = formikProps;
                        return (
                            <Form>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid item md={12} xs={12}>
                                        <FastField
                                            component={SPTextField}
                                            type="password"
                                            fullWidth
                                            label="current_password"
                                            name="currentPassword"
                                            fullWidth
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={12} xs={12}>
                                        <FastField
                                            component={SPTextField}
                                            type="password"
                                            fullWidth
                                            label="new_password"
                                            name="newPassword"
                                            fullWidth
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={12} xs={12}>
                                        <FastField
                                            component={SPTextField}
                                            type="password"
                                            fullWidth
                                            label="confirm_password"
                                            name="confirmPassword"
                                            fullWidth
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                                {(error) && <p>{error}</p>}
                                <Box
                                    display="flex"
                                    justifyContent="flex-end"
                                    p={2}
                                >
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                        disabled={!isValid && touched}
                                    >
                                        {t('change')}
                                        </Button>
                                </Box>
                            </Form>
                        )
                    }}
                </Formik>
            </CardContent>
        </Card>
    );
};

ChangePassword.propTypes = {
    className: PropTypes.string
};

export default ChangePassword;
