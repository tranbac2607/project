import React from 'react';
import { Route, Redirect } from 'react-router';

function PrivateRouter({ children, path, ...otherProps }) {
    const isLogin = localStorage.getItem('user');
    return (
        <Route {...otherProps} render={props => {
            return isLogin ? <Route path={path} >{children}</Route > : <Redirect to={{ pathname: '/users/sign-in', state: { from: props.location } }} />
        }} />
    )
}

export default PrivateRouter