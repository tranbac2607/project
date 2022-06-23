import { createSlice } from '@reduxjs/toolkit';

export const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        message: '',
        show: false
    },
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload.message
            state.show= action.payload.show
        }
    }
});

export const { setMessage } = alertSlice.actions;

export default alertSlice.reducers;