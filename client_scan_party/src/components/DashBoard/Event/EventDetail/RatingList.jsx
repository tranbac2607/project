import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import EnhancedTable from "../../../common/table";
import usePaginationAsync from "../../../hook/usePaginationAsync";
import eventService from "../eventService";
import ModalGuestInfo from "./ModalGuestInfo";
import QRCode from 'qrcode.react'
import moment from "moment";
import Rating from '@material-ui/lab/Rating';
import { useTranslation } from "react-i18next";


function RatingList({ data }) {
    const {t} = useTranslation();
    return (
        <>
            <TableContainer component={Paper} style={{maxHeight: '200px', overflow: 'scroll'}}>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">{t('index')}</TableCell>
                            <TableCell align="right">{t('guest_name')}</TableCell>
                            <TableCell align="right">{t('value')}</TableCell>
                            <TableCell align="right">{t('comment')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {data.map((row, index) => (
                            <TableRow key={row?._id}>
                                <TableCell align="right">{index + 1}</TableCell>
                                <TableCell align="right">{row?.aliasName}</TableCell>
                                <TableCell align="right">
                                    <Rating
                                        name="averageRating"
                                        value={row?.rating}
                                        size="large"
                                        readOnly
                                    />
                                </TableCell>
                                <TableCell align="right">{row?.comment}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

RatingList.defaultProps = {
    data: []
}

export default RatingList