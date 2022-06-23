import './App.css';
import Login from './components/Login';
import '../src/assets/scss/index.scss';
import { Route, Switch } from 'react-router-dom';
import DashBoard from './components/DashBoard';
import NotFound from './components/NotFound';
import Guest from './components/Guest';
import PrivateRoute from './PrivateRoute'
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

function App() {
  const themeColor = useSelector(state => state.theme.theme);

  const theme = createMuiTheme({
      palette: {
        type: themeColor,
      },
    })

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/users">
          <Login />
        </Route>
        <Route path="/guests/:eventId">
          <Guest />
        </Route>
        <PrivateRoute path="/">
          <DashBoard />
        </PrivateRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
