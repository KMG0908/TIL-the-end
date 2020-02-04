import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import List from "./List";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { fetchDailyLists } from "../../actions";
import TrelloCreate from "./TrelloCreate";
import { connect } from "react-redux";
import DatePicker from "./DatePicker";
import Icon from "@material-ui/core/Icon";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  list: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(0),
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

const today = new Date().toISOString().split("T")[0];
class DailyBoard extends React.Component {
  state = {
    date: new Date().toISOString().split("T")[0]
  };

  componentDidMount() {
    const { date } = this.state;
    if (this.props.members.mem_info) {
      this.props.fetchDailyLists(this.props.members.mem_info.mem_id, date);
    }
  }

  RenderList() {
    const { date } = this.state;
    if (this.props.boardDict[date]) {
      const { classes } = this.props;
      console.log(this.props.boards);

      const board_lists = Array.isArray(
        this.props.boards[this.props.boardDict[date]].board_lists
      )
        ? this.props.boards[this.props.boardDict[date]].board_lists
        : JSON.parse(this.props.boards[this.props.boardDict[date]].board_lists);

      return board_lists.map((list, index) => {
        if (this.props.cardLists[list]) {
          return (
            <Draggable
              draggableId={String(`list-${list}`)}
              index={index}
              key={list}
            >
              {provided => (
                <div key={this.props.cardLists[list].cardlist_id}>
                  <Paper
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={classes.list}
                  >
                    <List
                      board_id={this.props.boardDict[date]}
                      date={date}
                      cardlist_id={this.props.cardLists[list].cardlist_id}
                      title={this.props.cardLists[list].cardlist_name}
                      editMode={this.props.editMode}
                    />
                  </Paper>
                </div>
              )}
            </Draggable>
          );
        } else {
          return <></>;
        }
      });
    }
  }
  render() {
    const { classes } = this.props;
    const { date } = this.state;
    return (
      <Box>
        <Droppable
          droppableId={String(this.props.boardDict[date])}
          direction="vertical"
          type="list2"
        >
          {provided => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              <DatePicker
                onEditButton={() => {
                  this.props.onEditButton();
                }}
                onChangeDate={val => {
                  this.setState({ date: val });
                  this.props.fetchDailyLists(
                    this.props.members.mem_info.mem_id,
                    val
                  );
                }}
              />
              {this.RenderList()}
              {provided.placeholder}
              {this.state.date >= today ? (
                <Paper className={classes.addList} elevation={0}>
                  <TrelloCreate
                    date={date}
                    board_id={this.props.boardDict[date]}
                  />
                </Paper>
              ) : null}
            </Box>
          )}
        </Droppable>
      </Box>
    );
  }
}

const mapStateToProps = state => {
  return {
    boards: state.boards,
    boardDict: state.boardDict,
    cardLists: state.cardLists,
    members: state.members
  };
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, { fetchDailyLists })(DailyBoard)
);
