import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { fetchTodoLists } from "../../actions";
import List from "./List";
import TrelloCreate from "./TrelloCreate";

import { connect } from "react-redux";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  list: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    minHeight: "200px",
    width: "300px"
  },
  addList: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: "300px"
  }
});
class TodoBoard extends React.Component {
  componentDidMount() {
    this.props.fetchTodoLists("dsbang");
  }

  RenderList() {
    const { classes } = this.props;
    if (this.props.boards && this.props.boardDict["todo"]) {
      const board_lists = Array.isArray(
        this.props.boards[this.props.boardDict["todo"]].board_lists
      )
        ? this.props.boards[this.props.boardDict["todo"]].board_lists
        : JSON.parse(
            this.props.boards[this.props.boardDict["todo"]].board_lists
          );

      return board_lists.map(list => {
        if (this.props.cardLists[list]) {
          return (
            <Grid item spacing={2}>
              <Paper className={classes.list}>
                <List
                  board_id={this.props.boardDict["todo"]}
                  cardlist_id={this.props.cardLists[list].cardlist_id}
                  title={this.props.cardLists[list].cardlist_name}
                />
              </Paper>
            </Grid>
          );
        }
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={2}>
        {this.RenderList()}
        <Grid item className={classes.addList} elevation={0} spacing={2}>
          <TrelloCreate board_id={this.props.boardDict['todo']} />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    boards: state.boards,
    boardDict: state.boardDict,
    cardLists: state.cardLists
  };
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, { fetchTodoLists })(TodoBoard)
);
