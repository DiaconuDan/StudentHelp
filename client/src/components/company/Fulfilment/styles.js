import { withStyles } from "@material-ui/core/styles";
import React from 'react';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import green from '@material-ui/core/colors/green';

export const styles = theme => ({
    root: {
      marginLeft: 350,
      width: "70%",
      marginTop: theme.spacing.unit * 3,
      overflowX: "auto"
    },
    table: {
      minWidth: 700
    },
    fab: {
      margin: theme.spacing.unit
    },
    extendedIcon: {
      marginRight: theme.spacing.unit
    },
    button: {
      margin: theme.spacing.unit,
      textTransform: "none",
      width: 100,
      color: "white !important"
    },
    input: {
      display: "none"
    },
    margin: {
      margin: theme.spacing.unit,
    },
    cssRoot: {
      fontColor: "white !important",
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
  });

  export const DialogTitle = withStyles(theme => ({
    root: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      margin: 0,
      padding: theme.spacing.unit * 2,
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing.unit,
      top: theme.spacing.unit,
      color: theme.palette.grey[500]
    }
  }))(props => {
    const { children, classes, onClose } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="Close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  
  
  export const DialogContent = withStyles(theme => ({
    root: {
      margin: 0,
      padding: theme.spacing.unit * 2,
      marginBottom: -50
      
    }
  }))(MuiDialogContent);
  
  export const DialogActions = withStyles(theme => ({
    root: {
      borderTop: `1px solid ${theme.palette.divider}`,
      margin: 0,
      padding: theme.spacing.unit
    }
  }))(MuiDialogActions);
  