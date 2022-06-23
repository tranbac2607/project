import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { FastField, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { SPTextField } from '../../form_field';
import loginService from '../../Login/index.service';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  // const [user, setUser] = useState({ ...JSON.parse(localStorage.getItem('user')) })

  const handleSubmit = async (data) => {
    try {
      const res = await loginService.updateUser(data);
      localStorage.setItem('user', JSON.stringify(res.user))
      // setUser(res.user)
      toast(t(res.message));
      setError('')
    } catch (error) {
      setError(error.response.data.message);
      // setUser({ ...JSON.parse(localStorage.getItem('user')) })
    }
  }

  return (
    <Card elevation={9}>
      <CardHeader
        subheader={t('the_information_can_be_edited')}
        title={t('profile')}
      />
      <Divider />
      <CardContent>
        <Formik
          initialValues={{ ...user }}
          onSubmit={value => handleSubmit(value)}
          validationSchema={Yup.object({
            firstName: Yup.string().required('required'),
            lastName: Yup.string().required('required'),
            email: Yup.string().required('required').email(),
          })}
        >
          {formikProps => {
            const { isValid, touched, isSubmitting } = formikProps;
            return (
              <Form className={classes.form}>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <FastField
                      name="firstName"
                      component={SPTextField}
                      type="text"
                      variant="outlined"
                      label="first_name"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
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
                  <Grid item md={6} xs={12}>
                    <FastField
                      name="email"
                      component={SPTextField}
                      type="text"
                      variant="outlined"
                      label="email_address"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FastField
                      name="phoneNumber"
                      component={SPTextField}
                      type="text"
                      variant="outlined"
                      label="phone_number"
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FastField
                      name="facebookAddress"
                      component={SPTextField}
                      type="text"
                      variant="outlined"
                      label="facebook_address"
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FastField
                      name="company"
                      component={SPTextField}
                      type="text"
                      variant="outlined"
                      label="company"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                {(error) && <Alert severity="error">{error}</Alert>}
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  p={2}
                >
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={!isValid || isSubmitting}
                  >
                    {t('save_profile')}
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

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
