import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { DragDropContext } from "react-beautiful-dnd";
import { sort } from "../../actions";
import DailyBoard from "./DailyBoard";
import TodoBoard from "./TodoBoard";
import { connect } from "react-redux";
import Hidden from "@material-ui/core/Hidden";

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
  },
  items: {
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  }
});

class Todo extends React.Component {
  state = { editMode: false };

  FormRow() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid
          item
          className={classes.items}
          md={this.state.editMode ? 11 : 4}
          sm={12}
        >
          <Paper className={classes.daily}>
            <DailyBoard
              editMode={this.state.editMode}
              onEditButton={() => {
                this.setState({ editMode: !this.state.editMode });
              }}
            />
          </Paper>
        </Grid>
        <Hidden smDown>
          <Grid
            item
            className={classes.items}
            md={this.state.editMode ? 1 : 8}
            sm={12}
            overflow="hidden"
          >
            <Paper className={classes.lists}>
              <TodoBoard />
            </Paper>
          </Grid>
        </Hidden>
      </React.Fragment>
    );
  }

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    this.props.sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
              {this.FormRow()}
            </Grid>
          </Grid>
        </DragDropContext>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(
  connect(null, { sort })(Todo)
);
