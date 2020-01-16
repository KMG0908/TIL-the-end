import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import DailyTodo from "./DailyTodo";
import Lists from "./Lists";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  daily: {
    padding: theme.spacing(1),
    textAlign: "center",
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    minHeight: "300px",
    height:"100%"
  },
  lists: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    minHeight: "300px"
  }
}));

function Todo() {
  const classes = useStyles();

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item sm={4} xs={12}>
          <Paper className={classes.daily}>
            <DailyTodo />
          </Paper>
        </Grid>
        <Grid item sm={8} xs={12}>
          <Paper className={classes.lists}>
            <Lists />
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}

export default Todo;
