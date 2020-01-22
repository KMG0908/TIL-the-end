import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import DailyBoard from "./DailyBoard";
import TodoBoard from "./TodoBoard";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  daily: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    minHeight: "300px",
    height: "100%"
  },
  lists: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    minHeight: "300px",
    height: "100%"
  }
});

class Todo extends React.Component {
  FormRow() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid item md={4} sm={12}>
          <Paper className={classes.daily}>
            <DailyBoard />
          </Paper>
        </Grid>
        <Grid item md={8} sm={12}>
          <Paper className={classes.lists}>
            <TodoBoard />
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3}>
            {this.FormRow()}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Todo);
