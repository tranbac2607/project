import React from 'react';
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

function SPTextNormal({meta: {touched, error, warning}, variant, required, fullWidth, label, autoFocus, type }) {
    const {t} = useTranslation()
    return (
        <input
            type= {type}
        />
    )
}

SPTextNormal.propTypes = {
    variant: PropTypes.string,
    required: PropTypes.bool,
    fullWidth: PropTypes.bool,
    label: PropTypes.string,
    autoFocus: PropTypes.bool,
    type: PropTypes.string
}

export default SPTextNormal;
