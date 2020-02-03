import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { fetchDailyLists } from "../../actions";
import { Droppable, Draggable } from "react-beautiful-dnd";
import List from "./List";
import TrelloCreate from "./TrelloCreate";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import styled from "styled-components";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    flexGrow: 1
  },

  list: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: "#2C7873",
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

const ListsContainer = styled(Box)`
  height: 100%;
  display: flex;
  justifycontent: space-around;
  flex-direction: row;
  flexwrap: wrap;
`;

const Contain = styled(Container)`
  padding:0;  
height: 100%;
  display: flex;
  overflow: auto;
  justifycontent: space-around;
  flexwrap: wrap;
`;

const date = "9999-12-31"
class TodoBoard extends React.Component {
  componentDidMount() {
    if (this.props.members.mem_info) {
      this.props.fetchDailyLists(this.props.members.mem_info.mem_id,date);
    }
  }

  RenderList() {
    const { classes } = this.props;
    
    if (this.props.boards && this.props.boardDict[date]) {
      console.log(this.props.boardDict[date])
      const board_lists = Array.isArray(
        this.props.boards[this.props.boardDict[date]].board_lists
      )
        ? this.props.boards[this.props.boardDict[date]].board_lists
        : JSON.parse(
            this.props.boards[this.props.boardDict[date]].board_lists
          );

      return board_lists.map((list, index) => {
        if (this.props.cardLists[list]) {
          return (
            <Draggable
              draggableId={`list-${list}`}
              index={index}
              key={list}
            >
              {provided => (
                <Grid spacing={2} key={this.props.cardLists[list].cardlist_id}>
                  <Paper
                    className={classes.list}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <List
                      board_id={this.props.boardDict[date]}
                      cardlist_id={this.props.cardLists[list].cardlist_id}
                      title={this.props.cardLists[list].cardlist_name}
                    />
                  </Paper>
                </Grid>
              )}
            </Draggable>
          );
        }
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Contain>
        <Droppable
          droppableId={String(this.props.boardDict[date])}
          type="list2"
          direction="horizontal"
        >
          {provided => (
            <ListsContainer
              container
              spacing={2}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {this.RenderList()}
              {provided.placeholder}
              <Box item className={classes.addList} elevation={0}>
                <TrelloCreate date={date} board_id={this.props.boardDict[date]} />
              </Box>
            </ListsContainer>
          )}
        </Droppable>
      </Contain>
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
  connect(mapStateToProps, { fetchDailyLists })(TodoBoard)
);
