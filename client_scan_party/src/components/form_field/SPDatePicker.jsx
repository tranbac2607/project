import 'date-fns';
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { useTranslation } from 'react-i18next';
import DateFnsUtils from '@date-io/date-fns';

function SPDatePicker({
    field, // {name, value, onChange, onBlur}
    form, //also values, set, handle dirty, isValidate
    variant, required, margin, fullWidth, label, autoFocus, type, ...otherProps }) {
    const { t } = useTranslation();
    const { name, value } = field
    const { isValid, errors, touched, dirty } = form;

    const [selectedDate, setSelectedDate] = useState(value || new Date())

    const handleDateChange = (value) => {
        setSelectedDate(value)
        value = value
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <KeyboardDatePicker
                disableToolbar
                variant={'outlined'}
                format="MM/dd/yyyy"
                label={t(`${label}`)}
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                // rightArrowIcon={<div>hello</div>}
            />
        </MuiPickersUtilsProvider>
    )
}

SPDatePicker.propTypes = {
    variant: PropTypes.string,
    required: PropTypes.bool,
    fullWidth: PropTypes.bool,
    label: PropTypes.string,
    autoFocus: PropTypes.bool,
    type: PropTypes.string
}

export default SPDatePicker;
