import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import DailyBoard from "./DailyBoard";
import Board from "./Board";

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
    if (this.props.boards) {
      console.log(this.props.boards);
      return (
        <React.Fragment>
          <Grid item sm={4} xs={12}>
            <Paper className={classes.daily}>
              <DailyBoard />
              {/* {this.props.boards[0]} */}
            </Paper>
          </Grid>
          <Grid item sm={8} xs={12}>
            <Paper className={classes.lists}>
              <Board />
            </Paper>
          </Grid>
        </React.Fragment>
      );
    }
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
