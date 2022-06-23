import { TablePagination } from "@material-ui/core";
import React from "react";

export default function SPPagination({
  page,
  total,
  size,
  onChangePage,
  onChangeRowsPerPage,
}) {
  return (
    <TablePagination
      rowsPerPageOptions={[1, 5, 10, 25]}
      component="div"
      count={total}
      rowsPerPage={size}
      page={page}
      onChangePage={(e, page) => onChangePage(page)}
      onChangeRowsPerPage={(e) => onChangeRowsPerPage(e.target.value)}
      labelRowsPerPage={''}
    />
  );
}
