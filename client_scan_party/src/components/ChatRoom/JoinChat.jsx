import { Button } from '@material-ui/core';
import { FastField, Form, Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SPTextField } from '../form_field';
import './index.scss';

export default function JoinChat({joinChat}) {
    const {t} = useTranslation()
    const aliasName = localStorage.getItem("aliasName")

    function onSubmit(value) {
        localStorage.setItem("aliasName", value.aliasName);
        joinChat()
    }

    return (
        <div class="join-container">
            <header class="join-header">
                <h1><i class="fas fa-smile"></i>ChatRoom</h1>
            </header>
            <main class="join-main">
                <Formik
                    initialValues={{ aliasName: aliasName }}
                    onSubmit={value => onSubmit(value)}
                >
                    {formikProps => {
                        return (
                            <Form>
                                <div style={{ marginBottom: '1rem' }}>
                                    <FastField
                                        name="aliasName"
                                        component={SPTextField}
                                        type="text"
                                        label={t('enter_alias_name')}
                                        variant="outlined"
                                        fullWidth
                                        style={{ backgroundColor: 'white', borderRadius: '5px', marginBottom: '1rem' }}
                                        autoComplete={"off"}
                                    /></div>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    {t('join_chat')}
                                </Button>
                            </Form>
                        )
                    }}
                </Formik>
            </main>
        </div>
    )
}