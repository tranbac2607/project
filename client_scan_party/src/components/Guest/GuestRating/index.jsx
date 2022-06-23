import { Box, Button, Paper, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { FastField, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { SPTextField } from '../../form_field';
import SPTextArea from '../../form_field/SPTextArea';
import guestService from '../index.service';

function GuestRating() {
    const { t } = useTranslation()
    const [valueRating, setValueRating] = useState(1);
    const [rated, setRated] = useState(false)

    const { eventId } = useParams();

    async function handleSubmit(value) {
        localStorage.getItem('aliasName', value.aliasName)
        const dataSend = { ...value, rating: valueRating };
        try {
            const res = await guestService.Rating(eventId, dataSend);
            if (res) {
                setRated(true);
            }
        } catch (error) {

        }
    }

    function handleChangeRating(value) {
        setValueRating(value)
    }

    const aliasName = localStorage.getItem('aliasName');

    return (
        <Paper elevation={12} className="p1 m-1">
            <div>
                <header class="join-header">
                    <h1><i class="fas fa-smile"></i>{t('rating')}</h1>
                </header>
                <main class="join-main">
                    {!rated ? <Box>
                        <Rating
                            name="averageRating"
                            value={valueRating}
                            size="large"
                            className="flex-justify-content-center"
                            onChange={(e, value) => handleChangeRating(value)}
                        />
                        <Formik
                            initialValues={{ aliasName: aliasName, comment: '' }}
                            onSubmit={handleSubmit}
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
                                            />
                                            <FastField
                                                name="comment"
                                                component={SPTextArea}
                                                label={t('enter_comment')}
                                                rows={5}
                                                style={{ width: '100%' }}
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                        >
                                            {t('send_rating')}
                                        </Button>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </Box>
                        : <Box>
                            <Typography variant="h5" align="center">
                                {t('thank_you_for_send')}
                            </Typography>
                        </Box>}
                </main>
            </div>
        </Paper>
    )
}

export default GuestRating;