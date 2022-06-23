import React from 'react';
import PropTypes from 'prop-types'
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

function SPTextField({
    field, // {name, value, onChange, onBlur}
    form, //also values, set, handle dirty, isValidate
    variant, required, fullWidth, label, autoFocus, type, otherProps, color }) {
    const { t } = useTranslation()
    return (
        <FormControlLabel
            control={
                <Checkbox
                    {...field}
                    // value="remember"
                    color="primary"
                    {...otherProps} />
            }
            label={t(label)}
        />
    )
}

SPTextField.propTypes = {
    variant: PropTypes.string,
    required: PropTypes.bool,
    fullWidth: PropTypes.bool,
    label: PropTypes.string,
    autoFocus: PropTypes.bool,
    type: PropTypes.string,
    color: PropTypes.string
}

export default SPTextField;
