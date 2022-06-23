import React from 'react';
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

function SPTextField({
    field, // {name, value, onChange, onBlur}
    form, //also values, set, handle dirty, isValidate
    variant, 
    required, 
    margin, 
    fullWidth, 
    label, 
    autoFocus, 
    type, 
    ...otherProps 
}) {

    const { t } = useTranslation();
    const { name } = field
    const { isValid, errors, touched, dirty, validateOnMount } = form;

    return (
        <TextField
            {...field}
            variant={variant}
            required={required}
            fullWidth={fullWidth}
            label={t(label)}
            autoFocus={autoFocus}
            error={false}
            helperText={false}
            type={type}
            margin={margin}
            {...otherProps}
            // error={errors[name] && dirty}
            // helperText={(!isValid && dirty) ? t(errors[name]) : ''}
            
        />
    )
}

SPTextField.propTypes = {
    variant: PropTypes.string,
    required: PropTypes.bool,
    fullWidth: PropTypes.bool,
    label: PropTypes.string,
    autoFocus: PropTypes.bool,
    type: PropTypes.string
}

export default SPTextField;
