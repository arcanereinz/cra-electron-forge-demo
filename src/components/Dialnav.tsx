import React from 'react';

import { NavLink } from 'react-router-dom';
import { makeStyles, Tooltip, IconButton } from '@material-ui/core';

import VoicemailIcon from '@material-ui/icons/Voicemail';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import HistoryIcon from '@material-ui/icons/History';
import SmsIcon from '@material-ui/icons/Sms';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import DialpadIcon from '@material-ui/icons/Dialpad';
import Brightness6Icon from '@material-ui/icons/Brightness6';

import { IThemeSettings } from '../App';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {},
  tab: {},
}));

type TTabType =
  | 'account'
  | 'call-history'
  | 'darkmode'
  | 'dialpad'
  | 'directory'
  | 'help'
  | 'reload'
  | 'settings'
  | 'sms'
  | 'voicemail';

const tabs: {
  /** Title for tooltip */
  title: string;
  /** List of available tabs */
  name: TTabType;
  /** Icon for rendering */
  Icon: React.FC;
  /** Internal URL for related page */
  internalUrl?: string;
  /** External URL for related page */
  externalUrl?: string;
}[] = [
  {
    title: 'Directory',
    name: 'directory',
    internalUrl: '/directory',
    Icon: SupervisorAccountIcon,
  },
  {
    title: 'Call History',
    name: 'call-history',
    internalUrl: '/call-history',
    Icon: HistoryIcon,
  },
  {
    title: 'Dialpad',
    name: 'dialpad',
    internalUrl: '/dialpad',
    Icon: DialpadIcon,
  },
  {
    title: 'Voicemail',
    name: 'voicemail',
    internalUrl: '/voicemail',
    Icon: VoicemailIcon,
  },
  { title: 'SMS', name: 'sms', internalUrl: '/sms', Icon: SmsIcon },
  {
    title: 'Account',
    name: 'account',
    internalUrl: '/account',
    Icon: AccountCircleIcon,
  },
  { title: 'Reload', name: 'reload', Icon: RotateLeftIcon },
  {
    title: 'Help',
    name: 'help',
    Icon: HelpOutlineIcon,
    externalUrl: 'https://support.kixie.com/hc/en-us',
  },
  { title: 'Darkmode', name: 'darkmode', Icon: Brightness6Icon },
  {
    title: 'Settings',
    name: 'settings',
    internalUrl: '/account',
    Icon: SettingsIcon,
  },
];

export function Dialnav(props: {
  setThemeSettings: React.Dispatch<React.SetStateAction<IThemeSettings>>;
  className?: string;
}) {
  const classes = useStyles();

  const [tabSelected, setTabSelected] = React.useState<TTabType>('dialpad');
  const tabHandler =
    (tabName: TTabType) =>
    (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      switch (tabName) {
        case 'darkmode':
          props.setThemeSettings((state) => ({
            ...state,
            themeMode: state.themeMode === 'dark' ? 'light' : 'dark',
          }));
          break;
        case 'reload':
          window.location.reload();
          break;
        default:
          setTabSelected(tabName);
          break;
      }
    };

  return (
    <div className={clsx(classes.root, props.className)}>
      {tabs.map((tab) =>
        tab.internalUrl ? (
          <NavLink to={tab.internalUrl}>
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
          </NavLink>
        ) : tab.externalUrl ? (
          <a href={tab.externalUrl} target="_blank" rel="noreferrer">
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
          </a>
        ) : (
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
        ),
      )}
    </div>
  );
}
