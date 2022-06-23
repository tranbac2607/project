import React from 'react';
import { Navigate } from 'react-router-dom';

import Home from './components/Home';
import NotFound from './components/NotFound';
import ScanCode from './components/ScanCode';

const routers = [
    {
        path: '/',
        element: <Home />,
        children: [
            { path: 'account', element: <Home /> },
            { path: 'customers', element: <Home /> },
            { path: 'dashboard', element: <Home /> },
            { path: 'products', element: <Home /> },
            { path: 'settings', element: <Home /> },
            { path: 'not-found', element: <NotFound /> },
            { path: '*', element: <Navigate to="/not-found" /> }
        ]
    },
    {
        path: '/users',
        element: <Home />,
        children: [
            { path: 'sign-in', element: <Home /> },
            { path: 'sign-up', element: <Home /> },
            { path: 'forgot-password', element: <Home /> },
            { path: '*', element: <Navigate to="/not-found" /> }
        ]
    }
];

export default routers;