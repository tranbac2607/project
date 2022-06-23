import React, { useState, useEffect } from "react";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import SPPagination from "../common/pagination";

export default function usePaginationAsync({
    apiService,
    pageSizeDefault = 10,
}) {
    const [pagination, setPagination] = useState({
        page: 0,
        size: pageSizeDefault,
        total: 0,
    });
    const [filters, setFilters] = useState({
        page: 0,
        size: pageSizeDefault,
    });
    const queryClient = useQueryClient();

    const page = pagination.page
    const { data = [], isLoading: loading, isFetching, refetch } = useQuery(
        ['projects', page, { size: pagination.size }],
        fetchData,
        { staleTime: 10000, enabled: false, keepPreviousData: true })

    function handlePageChange(newPage) {
        setFilters({
            ...filters,
            page: newPage,
        });
    }

    function handleChangeRowsPerPage(newSize) {
        setFilters({
            ...filters,
            page: 0,
            size: newSize,
        });
    }

    function handleFiltersChange(newFilters) {
        setFilters({
            ...filters,
            ...newFilters,
            page: 0,
        });
    }



    useEffect(() => {
        refetch();
    }, [filters]);

    async function fetchData() {
        // console.log(data)
        const res = await apiService(filters);
        if (res) {
            const { content, pagination } = res;
            setPagination({
                size: parseInt(pagination?.size),
                page: parseInt(pagination?.page),
                total: parseInt(pagination?.total),
            });
            return content;
        }
        else {
            throw new Error(res.response.data.message);
        }
    }
    const Pagination = () => (
        <SPPagination
            page={pagination.page}
            total={pagination.total}
            size={pagination.size}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    );
    return {
        ...pagination,
        data,
        onChange: handleFiltersChange,
        Pagination,
        loading: loading || isFetching,
        fetchData,
    };
}
