import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
  Paper,
  darken,
} from '@material-ui/core';

import clsx from 'clsx';

import { Dialpad } from './pages/dialpad/Dialpad';
import { Dialnav } from './components/Dialnav';
import { Directory } from './pages/directory/Directory';
import { Account } from './pages/account/Account';
import { Settings } from './pages/settings/Settings';
import { CallHistory } from './pages/call-history/CallHistory';
import { Sms } from './pages/sms/Sms';
import { Voicemail } from './pages/voicemail/Voicemail';

import { TopNav } from './components/TopNav';
import { LeftDrawer } from './components/LeftDrawer';

export interface IThemeSettings {
  themeMode: 'dark' | 'light';
}

const defaultTheme = createMuiTheme();
const theme = (themeSettings: IThemeSettings) =>
  createMuiTheme({
    /**
     * Customize built-in palette
     */
    palette: {
      type: themeSettings.themeMode,
      primary: {
        main:
          themeSettings.themeMode === 'dark'
            ? darken(defaultTheme.palette.primary.main, 0.75)
            : defaultTheme.palette.primary.main,
      },
      success: {
        // light: will be calculated from palette.primary.main,
        main: defaultTheme.palette.success.main,
        // dark: will be calculated from palette.primary.main,
        contrastText: defaultTheme.palette.background.default, // will be calculated to contrast with palette.primary.main
      },
    },
  });

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'min-content',
    minWidth: '18em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  main: {
    minHeight: 400,
    minWidth: 252,
  },
  nav: {
    textAlign: 'center',
  },
}));

function App(props: { basename: string }) {
  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const drawerHandler = () => setOpenDrawer((state) => !state);

  const [hideControls, setHideControls] = React.useState(false);
  const handleHideControls = () => {
    setHideControls((state) => !state);
  };

  const [themeSettings, setThemeSettings] = React.useState<IThemeSettings>({
    themeMode: 'light',
  });

  return (
    <BrowserRouter basename={props.basename}>
      <ThemeProvider theme={theme(themeSettings)}>
        <CssBaseline /* darken background */ />
        <div className={clsx('App', classes.root)}>
          <Paper elevation={0}>
            <TopNav
              hideControls={hideControls}
              handleHideControls={handleHideControls}
              drawerHandler={drawerHandler}
            />
            <main className={classes.main}>
              <Switch>
                <Route path="/account">
                  <Account />
                </Route>
                <Route path="/call-history">
                  <CallHistory />
                </Route>
                <Route path="/dialpad">
                  <Dialpad />
                </Route>
                <Route path="/directory">
                  <Directory />
                </Route>
                <Route path="/settings">
                  <Settings />
                </Route>
                <Route path="/sms">
                  <Sms />
                </Route>
                <Route path="/voicemail">
                  <Voicemail />
                </Route>
                <Route path="/">
                  <Dialpad />
                </Route>
              </Switch>
            </main>
            <nav className={classes.nav}>
              {!hideControls && <Dialnav setThemeSettings={setThemeSettings} />}
            </nav>
            <LeftDrawer openDrawer={openDrawer} drawerHandler={drawerHandler} />
          </Paper>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
