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
import { useTranslation } from "react-i18next";


export default function EventDetailTable({ eventId }) {
  const {t} = useTranslation();
  const [ticketId, setTicketId] = useState();
  const [isShowModalGuestInfo, setShowModalGuestInfo] = useState(false);
  async function getListTicket(params) {
    try {
      const res = await eventService.getListTicket(params, eventId);
      return res;
    } catch (error) {
      toast(t(error.response.data.message));
    }
    return null;
  }

  function showModalGuestInfo(ticketId) {
    setTicketId(ticketId);
    setShowModalGuestInfo(true);
  }

  const {
    Pagination,
    loading,
    fetchData,
    onChange,
    data,
  } = usePaginationAsync({ apiService: getListTicket });
  return (
    <>
     {isShowModalGuestInfo &&  <ModalGuestInfo
        ticketId={ticketId}
        isShow={isShowModalGuestInfo}
        setShow={setShowModalGuestInfo}
      />}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">{t('index')}</TableCell>
              <TableCell align="right">{t('value')}</TableCell>
              <TableCell align="right">{t('created_date')}</TableCell>
              <TableCell align="right">{t('expiration_date')}</TableCell>
              <TableCell align="right">{t('status')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row._id}>
                <TableCell align="right">{index + 1}</TableCell>
                <TableCell align="right">
                  <Link onClick={() => showModalGuestInfo(row._id)}>
                    <QRCode value={row.value} size={64}/>
                  </Link>
                </TableCell>
                <TableCell align="right">{moment(row.dateCreated).format("DD/MM/YYYY")}</TableCell>
                <TableCell align="right">{moment(row.expirationDate).format("DD/MM/YYYY")}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination />
    </>
  );
}
