import React from 'react';
import {
  makeStyles,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  FormControlLabel,
  Switch,
} from '@material-ui/core';

import clsx from 'clsx';

import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  listContainer: {
    width: 250,
  },
  list: {
    padding: 0,
  },
  fullList: {
    width: 'auto',
  },
}));

/**
 * Drawer opening from left
 *
 * @see https://stackoverflow.com/questions/63297109/nested-sidebar-menu-with-material-ui-and-reactjs
 * @see https://codesandbox.io/s/lucid-lichterman-s5uhm?fontsize=14&hidenavigation=1&theme=dark
 *
 * @param props
 * @returns
 */
export function LeftDrawer(props: {
  openDrawer: boolean;
  drawerHandler: () => void;
  className?: string;
}) {
  const classes = useStyles();

  return (
    <Drawer
      className={props.className}
      anchor="left"
      open={props.openDrawer}
      onClose={props.drawerHandler}
    >
      <div
        className={clsx(classes.listContainer, {
          [classes.fullList]: false,
        })}
        role="presentation"
        // onClick={props.drawerHandler}
        // onKeyDown={props.drawerHandler}
      >
        <List className={classes.list} onClick={props.drawerHandler}>
          <ListItem button>
            <ListItemIcon>
              <CloseIcon />
            </ListItemIcon>
            <ListItemText primary="Close" />
          </ListItem>
        </List>
        <Divider />
        <List className={classes.list}>
          {[
            'Click-to-call',
            'Screen Pop',
            'Local Presence',
            'Require Outcome',
          ].map((text) => (
            <ListItem button key={text}>
              <FormControlLabel
                value="start"
                control={<Switch color="primary" />}
                label={text}
                labelPlacement="end"
              />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
}
