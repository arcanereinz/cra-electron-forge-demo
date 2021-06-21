import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import capitalize from 'lodash/capitalize';

import MuiButton, {
  ButtonProps as MuiButtonProps,
} from '@material-ui/core/Button';

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

type ButtonProps = { color: ColorTypes } & Omit<MuiButtonProps, 'color'>;

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    outlinedSuccess: {
      borderColor: theme.palette.success.main,
      color: theme.palette.success.main,
    },
    outlinedError: {
      borderColor: theme.palette.error.main,
      color: theme.palette.error.main,
    },
    outlinedWarning: {
      borderColor: theme.palette.warning.main,
      color: theme.palette.warning.main,
    },
    outlinedInfo: {
      borderColor: theme.palette.info.main,
      color: theme.palette.info.main,
    },
    outlinedTransparent: {
      boxShadow: 'none',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.success.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.background.default,
      },
    },
    containedSuccess: {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.success.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.success.dark,
      },
    },
    containedError: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.error.dark,
      },
    },
    containedWarning: {
      backgroundColor: theme.palette.warning.main,
      color: theme.palette.warning.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.warning.dark,
      },
    },
    containedInfo: {
      backgroundColor: theme.palette.info.main,
      color: theme.palette.info.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.info.dark,
      },
    },
    containedTransparent: {
      boxShadow: 'none',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.success.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }),
);

/**
 * Create Material-UI themed button
 *
 * @example <ThemedButton variant="contained" color="success">sample</ThemedButton>
 *
 * @see https://stackoverflow.com/questions/46486565/material-ui-next-customize-button-colors
 *
 * @param props Button properties
 * @returns
 */
export const ThemedButton: React.FC<ButtonProps> = ({
  children,
  color,
  ...props
}) => {
  const classes = useStyles();
  const className = classes?.[`${props.variant}${capitalize(color)}`];
  const colorProp =
    ['default', 'inherit', 'primary', 'secondary'].indexOf(color) > -1
      ? (color as 'default' | 'inherit' | 'primary' | 'secondary')
      : undefined;

  return (
    <MuiButton {...props} color={colorProp} className={className}>
      {children}
    </MuiButton>
  );
};

// If using as default component
// ThemedButton.displayName = 'ThemedButton';
// export default ThemedButton;
