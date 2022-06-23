import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        accessToken: "",
        refreshToken: "",
        user: JSON.parse(localStorage.getItem("user")) || {},
    },
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload.accessToken;
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload.refreshToken;
        },
        signIn: (state, action) => {
            state.user = JSON.parse(localStorage.getItem("user"))
        },
        logOut: (state, action) => {
            localStorage.removeItem("access-token");
            localStorage.removeItem("refresh-token");
            localStorage.removeItem("user");
        },
        changeUser: (state) => {
            state.user = JSON.parse(localStorage.getItem("user")) || {};
        },
    },
});

export const {
    setAccessToken,
    setRefreshToken,
    changeUser,
    logOut,
    signIn
} = authSlice.actions;

export default authSlice.reducer;
