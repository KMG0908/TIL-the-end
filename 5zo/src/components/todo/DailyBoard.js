import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import List from "./List";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { fetchDailyLists, setEditModeList } from "../../actions";
import TrelloCreate from "./TrelloCreate";
import { connect } from "react-redux";
import DatePicker from "../helper/DatePicker";
import Typography from "@material-ui/core/Typography";

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
              isDragDisabled={this.state.date < today}
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
              <Typography variant="h4">Today I learn</Typography>
              <Typography variant="body">
                오늘 내가 배운 것들을 기록하세요.
                <br />
                혹은, 과거에 배운것을 확인하거나 미래에 배울 내용을 계획하세요.
              </Typography>
              <DatePicker
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
    members: state.members,
    editModeList: state.editModeList
  };
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, { fetchDailyLists, setEditModeList })(DailyBoard)
);
