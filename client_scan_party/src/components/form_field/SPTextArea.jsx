import React from 'react';
import PropTypes from 'prop-types'
import { TextareaAutosize, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

function SPTextArea({
    field, // {name, value, onChange, onBlur}
    form, //also values, set, handle dirty, isValidate
    rows, rowsMax, rowsMin, placeholder, defaultValue, label, ...otherProps }) {
    const { t } = useTranslation();
    const { name } = field
    const { isValid, errors, touched, dirty, validateOnMount } = form;

    return (
        <>
            <Typography variant="sub-title">{t(label)}</Typography>
            <TextareaAutosize
                {...field}
                rows={rows || 5}
                rowsMax={rowsMax || 5}
                aria-label="maximum height"
                placeholder={placeholder}
                defaultValue={defaultValue}
                style={{ width: '100%' }}
            />
            {errors[name] && <Typography variant="sub-title">{t(errors[name])}</Typography>}
        </>
    )
}

SPTextArea.propTypes = {
    rows: PropTypes.number,
    rowsMax: PropTypes.number,
    rowsMin: PropTypes.number,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    label: PropTypes.string
}

export default SPTextArea;
