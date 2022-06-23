import { createSlice } from "@reduxjs/toolkit";

export const scanTicketSlice = createSlice({
    name: "scanTicket",
    initialState: {
        infoCustomer: {}
    },
    reducers: {
        setInfoCustomer: (state, action) => {
            state.infoCustomer = action.payload.infoCustomer;
        },
    },
});

export const {
    setInfoCustomer
} = scanTicketSlice.actions;

export default scanTicketSlice.reducer;
