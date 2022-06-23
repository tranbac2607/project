/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import {
    Box,
} from '@material-ui/core';
import NotFoundImage from '../../assets/images/not-found.jpg'

const NotFound = () => (
    <Box style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
            <img
                alt="not-found-image"
                src={NotFoundImage}
                style={{
                    marginTop: 50,
                    display: 'inline-block',
                    maxWidth: '100%',
                    width: 560
                }}
            />
        </Box>
    </Box>
);

export default NotFound;