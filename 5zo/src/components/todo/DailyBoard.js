import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "./List";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { fetchDailyLists } from "../../actions";
import TrelloCreate from "./TrelloCreate";

import { connect } from "react-redux";
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  list: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: "#94C9A9",
    color: theme.palette.error.contrastText,
    minHeight: "200px",
    width: "100%"
  },
  addList: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: "100%"
  }
});
const date = "20200122";
class DailyBoard extends React.Component {
  componentDidMount() {
    this.props.fetchDailyLists("dsbang", date);
  }

  RenderList(provided) {
    if (this.props.boardDict[date]) {
      const { classes } = this.props;

      const board_lists = Array.isArray(
        this.props.boards[this.props.boardDict[date]].board_lists
      )
        ? this.props.boards[this.props.boardDict[date]].board_lists
        : JSON.parse(this.props.boards[this.props.boardDict[date]].board_lists);

      return board_lists.map((list, index) => {
        if (this.props.cardLists[list]) {
          return (
            <Draggable
              {...provided.droppableProps}
              ref={provided.innerRef}
              draggableId={String(this.props.cardLists[list].cardlist_id)}
              index={index}
            >
              {provided => (
                <Paper
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={classes.list}
                  spacing={2}
                  key={this.props.cardLists[list].cardlist_id}
                >
                  {provided.placeholder}
                  <List
                    board_id={this.props.boardDict[date]}
                    cardlist_id={this.props.cardLists[list].cardlist_id}
                    title={this.props.cardLists[list].cardlist_name}
                  />
                </Paper>
              )}
            </Draggable>
          );
        } else {
          return <></>;
        }
      });
    }
  }
  onDragEnd = () => {
    console.log(1);
  };
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={2}>
        <div>Daily Todo 2020-01-22</div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId={date} direction="horizontal" type="list">
            {provided => this.RenderList(provided)}
          </Droppable>
        </DragDropContext>
        <Paper className={classes.addList} elevation={0} spacing={2}>
          <TrelloCreate board_id={this.props.boardDict[date]} />
        </Paper>
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
  connect(mapStateToProps, { fetchDailyLists })(DailyBoard)
);
