import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
    name: 'test',
    initialState: {
        value: 0
    },
    reducers: {
        increment: state => {
            state.value += 1;
        },
        decrement: state => {
            state.value -= 1;
        }
    }
});

export const { increment, decrement} = counterSlice.actions;

export default counterSlice.reducers;