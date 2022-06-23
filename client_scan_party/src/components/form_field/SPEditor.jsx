import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useTranslation } from 'react-i18next';
import { Grid, Box, Button } from '@material-ui/core';

function SPEditor({
    field, // {name, value, onChange, onBlur}
    form, //also values, set, handle dirty, isValidate
    variant, required, margin, label, ...otherProps }) {
    const { t } = useTranslation();
    const { name, value } = field
    const { isValid, errors, touched, dirty } = form;

    function onChange (event, editor) {
        form.setFieldValue(name, editor.getData())
    }
    
    return (
        <Box>
            <Box mb={2}>{t(`${label}`)}</Box>
            <CKEditor
                editor={ClassicEditor}
                data={value}
                onChange={onChange}
            />
            {errors[name] && <p>{(!isValid) ? t(errors[name]) : ''}</p>}
        </Box >
    )
}

export default SPEditor;