import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Dialer } from './pages/Dialer';

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
      success: {
        // light: will be calculated from palette.primary.main,
        main: defaultTheme.palette.success.main,
        // dark: will be calculated from palette.primary.main,
        contrastText: defaultTheme.palette.background.default, // will be calculated to contrast with palette.primary.main
      },
    },
  });

const useStyles = makeStyles((theme) => ({
  main: {
    width: 'min-content',
    minWidth: '15em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

function App() {
  const [themeSettings, setThemeSettings] = React.useState<IThemeSettings>({
    themeMode: 'light',
  });
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme(themeSettings)}>
      <div className="App">
        <header className="App-header"></header>
        <main className={classes.main}>
          <Dialer setThemeSettings={setThemeSettings} />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
