import React from 'react';

import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
} from '@material-ui/core';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import MenuIcon from '@material-ui/icons/Menu';

import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';
import PortableWifiOffIcon from '@material-ui/icons/PortableWifiOff';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Brightness6Icon from '@material-ui/icons/Brightness6';

import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'min-content',
    minWidth: '18em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  onlineButton: {
    marginRight: theme.spacing(2),
  },
  menuButton: {
    // marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  main: {
    minHeight: '400px',
  },
  nav: {
    textAlign: 'center',
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  speedDial: {
    position: 'absolute',
    '& .MuiSpeedDial-fab': {
      boxShadow: 'none',
      height: 48,
      width: 48,
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(0),
      right: theme.spacing(0),
    },
  },
}));

export function TopNav(props: {
  drawerHandler: () => void;
  hideControls: boolean;
  handleHideControls: () => void;
  className?: string;
}) {
  const classes = useStyles();

  const [openSpeedDial, setOpenSpeedDial] = React.useState(false);
  const handleClose = () => {
    setOpenSpeedDial(false);
  };
  const handleOpen = () => {
    setOpenSpeedDial(true);
  };

  const [online, setOnline] = React.useState(true);
  const handleOnline = () => {
    setOnline((state) => !state);
  };

  const actions = React.useMemo(
    () => [
      props.hideControls
        ? {
            icon: <FullscreenExitIcon />,
            name: 'Show Controls',
            handler: props.handleHideControls,
          }
        : {
            icon: <FullscreenIcon />,
            name: 'Hide Controls',
            handler: props.handleHideControls,
          },
      { icon: <SaveIcon />, name: 'Save', handler: handleClose },
      { icon: <PrintIcon />, name: 'Print', handler: handleClose },
      { icon: <ShareIcon />, name: 'Share', handler: handleClose },
      { icon: <FavoriteIcon />, name: 'Like', handler: handleClose },
    ],
    [props.hideControls, props.handleHideControls],
  );

  return (
    <AppBar
      className={clsx('App-header', props.className)} // props.className has precedence
      position="static"
      elevation={0}
    >
      <Toolbar className={classes.toolbar} variant="dense">
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={props.drawerHandler}
        >
          <MenuIcon />
        </IconButton>
        <div>
          {online ? (
            <Tooltip title="Online">
              <IconButton
                color="inherit"
                aria-label="online"
                onClick={handleOnline}
              >
                <WifiTetheringIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Offline">
              <IconButton
                color="inherit"
                aria-label="offline"
                onClick={handleOnline}
              >
                <PortableWifiOffIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Darkmode">
            <IconButton color="inherit" aria-label="darkmode">
              <Brightness6Icon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reload">
            <IconButton color="inherit" aria-label="online">
              <RotateLeftIcon />
            </IconButton>
          </Tooltip>
        </div>
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={openSpeedDial}
          direction="down"
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.handler}
            />
          ))}
        </SpeedDial>
      </Toolbar>
    </AppBar>
  );
}
