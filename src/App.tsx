import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core';
import { Dialer } from './pages/Dialer';

const useStyles = makeStyles((theme) => ({
  main: {
    width: 'min-content',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <header className="App-header"></header>
      <main className={classes.main}>
        <Dialer />
      </main>
    </div>
  );
}

export default App;
