import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import MuiFab, { FabProps as MuiFabProps } from '@material-ui/core/Fab';
import clsx from 'clsx';

export type ColorTypes =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'success'
  | 'warning'
  | 'default'
  | 'inherit'
  | 'info'
  | 'transparent';

type FabProps = { color: ColorTypes } & Omit<MuiFabProps, 'color'>;

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    default: {
      boxShadow: 'none',
    },
    transparent: {
      boxShadow: 'none',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.success.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.background.default,
      },
      '&.Mui-disabled': {
        backgroundColor: theme.palette.background.paper,
      },
    },
    success: {
      boxShadow: 'none',
      backgroundColor: theme.palette.success.main,
      color: theme.palette.success.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.success.dark,
      },
    },
    error: {
      boxShadow: 'none',
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.error.dark,
      },
    },
    warning: {
      boxShadow: 'none',
      backgroundColor: theme.palette.warning.main,
      color: theme.palette.warning.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.warning.dark,
      },
    },
    info: {
      boxShadow: 'none',
      backgroundColor: theme.palette.info.main,
      color: theme.palette.info.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.info.dark,
      },
    },
  }),
);

/**
 * Create Material-UI themed button
 *
 * @example <ThemedFab variant="contained" color="success">sample</ThemedFab>
 *
 * @see https://stackoverflow.com/questions/46486565/material-ui-next-customize-button-colors
 *
 * @param props Fab properties
 * @returns
 */
export const ThemedFab: React.FC<FabProps> = ({
  children,
  color,
  ...props
}) => {
  const classes = useStyles();
  const colorProp =
    ['default', 'inherit', 'primary', 'secondary'].indexOf(color) > -1
      ? (color as 'default' | 'inherit' | 'primary' | 'secondary')
      : undefined;

  return (
    <MuiFab
      {...props}
      color={colorProp}
      className={clsx(classes?.[color], props.className)}
    >
      {children}
    </MuiFab>
  );
};

// If using as default component
// ThemedFab.displayName = 'ThemedFab';
// export default ThemedFab;
