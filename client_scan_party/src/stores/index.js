import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './slices/test';
import authReducer from './slices/authSlice';
import alertReducer from './slices/alertSlice';
import scanTicketReducer from './slices/scanTicketSlice';
import themeReducer from './slices/themeSlice';

export default configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        alert: alertReducer,
        scanTicket: scanTicketReducer,
        theme: themeReducer
    }
})