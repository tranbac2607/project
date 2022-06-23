import { Box, CircularProgress } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import usePaginationAsync from '../../hook/usePaginationAsync';
import ItemImage from './ItemImage';
import StoreItem from './StoreItem';
import storeService from './storeService';

export default function ListImage({ userId }) {
    const {
        Pagination,
        loading,
        data,
    } = usePaginationAsync({ apiService: getListImage, pageSizeDefault: 5 });
    const {t} = useTranslation();

    async function getListImage(params) {
        try {
            const listExcel = await storeService.getFileImage(params, userId);
            return listExcel;
        } catch (error) {
            toast(t(error.response.data.message));
        }
        return null;
    }

    return (
        <Box>
            {loading &&
                <Box style={{width: '100%', textAlign: 'center'}}>
                    <CircularProgress />
                </Box>}
            {data?.map(ele => (
                <ItemImage data={ele} />
            ))}
            <Pagination />
        </Box>
    )
}