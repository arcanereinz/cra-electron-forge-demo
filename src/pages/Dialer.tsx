import React from 'react';
// import logo from './logo.svg';
import {
  makeStyles,
  Tooltip,
  TextField,
  IconButton,
  Paper,
} from '@material-ui/core';
import { ThemedFab } from '../components/ThemedFab';
import CallIcon from '@material-ui/icons/Call';
import VoicemailIcon from '@material-ui/icons/Voicemail';
import PauseIcon from '@material-ui/icons/Pause';
import MicOffIcon from '@material-ui/icons/MicOff';
import PhonePausedIcon from '@material-ui/icons/PhonePaused';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import HistoryIcon from '@material-ui/icons/History';
import SmsIcon from '@material-ui/icons/Sms';
import BackspaceIcon from '@material-ui/icons/Backspace';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import DialpadIcon from '@material-ui/icons/Dialpad';
import Brightness6Icon from '@material-ui/icons/Brightness6';
import clsx from 'clsx';

// @see https://material.io/design/sound/applying-sound-to-ui.html#system-sounds
import pressSound from '../assets/audio/material_product_sounds/wav/02-Alerts-and-Notifications/notification_simple-01.wav';
import ringSound from '../assets/audio/material_product_sounds/wav/02-Alerts-and-Notifications/alert_simple.wav';
import { IThemeSettings } from '../App';

const useStyles = makeStyles((theme) => ({
  prompt: {
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      border: 'none', // remove hover underline
    },
    '& .MuiInput-multiline': {
      lineHeight: 'normal',
    },
    '& textarea': {
      textAlign: 'center',
      fontSize: '1.5em',
    },
    '& .MuiInputBase-root::before': {
      border: 'none',
    },
    '& .MuiInputBase-root::after': {
      border: 'none',
    },
  },
  dialer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    margin: 0,
    padding: 0,
    '& li': {
      listStyleType: 'none',
    },
  },
  dialerButton: {
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& data': {
      fontSize: '2em', // relative to container 1em = 16px
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    },
    '& p': {
      fontSize: '0.7em', // relative to container 1em = 16px
    },
  },
  call: {
    margin: theme.spacing(1),
  },
  fab: {
    '& .MuiFab-label': {
      flexDirection: 'column',
      '& data': {
        marginBottom: '-0.75em',
      },
    },
  },
  star: {
    '& p': {
      marginBottom: '1.5em',
    },
  },
  voicemail: {
    '& p': {
      marginBottom: 'auto',
    },
  },
  tab: {
    // marginLeft: theme.spacing(0.25),
    // marginRight: theme.spacing(0.25),
  },
}));

type TTabType =
  | 'directory'
  | 'call-history'
  | 'dialpad'
  | 'voicemail'
  | 'sms'
  | 'account'
  | 'reload'
  | 'help'
  | 'settings'
  | 'darkmode';

const tabs: {
  /** Title for tooltip */
  title: string;
  /** List of available tabs */
  name: TTabType;
  /** Icon for rendering */
  Icon: React.FC;
}[] = [
  {
    title: 'Directory',
    name: 'directory',
    Icon: SupervisorAccountIcon,
  },
  { title: 'Call History', name: 'call-history', Icon: HistoryIcon },
  { title: 'Dialpad', name: 'dialpad', Icon: DialpadIcon },
  { title: 'Voicemail', name: 'voicemail', Icon: VoicemailIcon },
  { title: 'SMS', name: 'sms', Icon: SmsIcon },
  { title: 'Account', name: 'account', Icon: AccountCircleIcon },
  { title: 'Reload', name: 'reload', Icon: RotateLeftIcon },
  { title: 'Help', name: 'help', Icon: HelpOutlineIcon },
  { title: 'Darkmode', name: 'darkmode', Icon: Brightness6Icon },
  { title: 'Settings', name: 'settings', Icon: SettingsIcon },
];

export function Dialer(props: {
  setThemeSettings: React.Dispatch<React.SetStateAction<IThemeSettings>>;
}) {
  const classes = useStyles();

  const dialpad: {
    /** digit/symbol being pressed */
    symbol: string;
    /** Letters under digits */
    caption: React.ReactNode;
    /** Custom styling for button */
    className?: string;
    /** Use HTML character instead of symbol to show digit/symbol */
    char?: string;
  }[] = [
    {
      className: classes.voicemail,
      symbol: '1',
      caption: <VoicemailIcon />,
    },
    { symbol: '2', caption: 'ABC' },
    { symbol: '3', caption: 'DEF' },
    { symbol: '4', caption: 'GHI' },
    { symbol: '5', caption: 'JKL' },
    { symbol: '6', caption: 'MNO' },
    { symbol: '7', caption: 'PQRS' },
    { symbol: '8', caption: 'TUV' },
    { symbol: '9', caption: 'WXYZ' },
    {
      className: classes.star,
      symbol: '*',
      char: '&lowast;',
      caption: '',
    },
    { symbol: '0', caption: '+' },
    { symbol: '#', caption: '' },
  ];

  const buttonPressAudioRef: React.LegacyRef<HTMLAudioElement> | undefined =
    React.useRef(null);
  const buttonPressHandler =
    (symbol: string) =>
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      buttonPressAudioRef.current?.pause();
      if (buttonPressAudioRef.current?.currentTime) {
        buttonPressAudioRef.current.currentTime = 0;
      }
      // buttonPressAudioRef.current?.play();
      setPrompt((state) => state + symbol);
    };

  const timeoutIdRef = React.useRef<NodeJS.Timeout>();
  const ringAudioRef: React.LegacyRef<HTMLAudioElement> | undefined =
    React.useRef(null);
  const [callingStatus, setCallingStatus] =
    React.useState<undefined | 'calling' | 'talking' | 'paused'>();
  const callHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    switch (callingStatus) {
      case undefined:
        if (prompt) {
          setCallingStatus('calling');
          timeoutIdRef.current = setTimeout(() => {
            setCallingStatus('talking'); // clear calling status
          }, 1000);
          ringAudioRef.current?.play();
        } else if (lastPrompt) {
          setPrompt(lastPrompt);
        }
        break;
      default:
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
        }
        ringAudioRef.current?.pause();
        if (ringAudioRef.current?.currentTime) {
          ringAudioRef.current.currentTime = 0;
        }
        setMute(false);
        setPaused(false);
        setLastPrompt(prompt);
        setPrompt('');
        setCallingStatus(undefined);
        break;
    }
  };

  const [paused, setPaused] = React.useState(false);
  const pauseHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setPaused((state) => !state);
  };

  const [mute, setMute] = React.useState(false);
  const muteHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setMute((state) => !state);
  };

  const [dnd, setDnd] = React.useState(false);
  const dndHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setDnd((state) => !state);
  };

  const [lastPrompt, setLastPrompt] = React.useState('');
  const [prompt, setPrompt] = React.useState('');
  const promptHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setPrompt(event.target.value);
  };

  const backspaceHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setPrompt((state) => state.slice(0, state.length - 1));
  };

  const [tabSelected, setTabSelected] = React.useState<TTabType>('dialpad');
  const tabHandler =
    (tabName: TTabType) =>
    (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (tabName === 'darkmode') {
        props.setThemeSettings((state) => ({
          ...state,
          themeMode: state.themeMode === 'dark' ? 'light' : 'dark',
        }));
      } else {
        setTabSelected(tabName);
      }
    };

  return (
    <Paper elevation={0}>
      <TextField
        className={classes.prompt}
        value={prompt}
        onChange={promptHandler}
        multiline={true}
      />
      <ul className={classes.dialer}>
        {dialpad.map((item) => (
          <li className={classes.dialerButton} key={item.symbol}>
            <ThemedFab
              className={clsx(classes.fab, item.className)}
              color="default"
              aria-label={String(item.symbol)}
              onClick={buttonPressHandler(item.symbol)}
            >
              <data
                value={item.char ?? item.symbol}
                dangerouslySetInnerHTML={{ __html: item.char ?? item.symbol }}
              ></data>
              <p>{item.caption}</p>
            </ThemedFab>
          </li>
        ))}
      </ul>
      <ul className={classes.dialer}>
        <li>
          {callingStatus === 'talking' || callingStatus === 'paused' ? (
            <ThemedFab
              className={classes.call}
              color="transparent"
              onClick={pauseHandler}
              aria-label="pause"
            >
              <PauseIcon color={paused ? undefined : 'disabled'} />
            </ThemedFab>
          ) : (
            <ThemedFab
              className={classes.call}
              color="transparent"
              onClick={dndHandler}
              aria-label="pause"
            >
              <Brightness2Icon color={dnd ? undefined : 'disabled'} />
            </ThemedFab>
          )}
        </li>
        <li>
          <ThemedFab
            className={classes.call}
            onClick={callHandler}
            color={callingStatus === undefined ? 'success' : 'error'}
            aria-label="call"
          >
            {paused ? <PhonePausedIcon /> : <CallIcon />}
          </ThemedFab>
        </li>
        <li>
          {callingStatus === 'talking' || callingStatus === 'paused' ? (
            <ThemedFab
              className={classes.call}
              onClick={muteHandler}
              color="transparent"
              aria-label="mute"
            >
              <MicOffIcon color={mute ? undefined : 'disabled'} />
            </ThemedFab>
          ) : (
            <ThemedFab
              className={classes.call}
              onClick={backspaceHandler}
              color="transparent"
              aria-label="backspace"
              disabled={!prompt}
            >
              <BackspaceIcon />
            </ThemedFab>
          )}
        </li>
      </ul>
      <aside>
        {tabs.map((tab) => (
          <Tooltip key={tab.name} title={tab.title}>
            <IconButton
              className={classes.tab}
              aria-label={tab.name}
              onClick={tabHandler(tab.name)}
              color={tabSelected === tab.name ? 'primary' : 'default'}
            >
              <tab.Icon />
            </IconButton>
          </Tooltip>
        ))}
      </aside>
      <audio id="audio" ref={buttonPressAudioRef} src={pressSound}></audio>
      <audio id="audio" ref={ringAudioRef} src={ringSound}></audio>
    </Paper>
  );
}
