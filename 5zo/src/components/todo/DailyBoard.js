import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "./List";
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
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    minHeight: "200px",
    width: "100%"
  },
  addList:{
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: "100%"
  }
});
const date = "20200122"
class DailyBoard extends React.Component {
  componentDidMount() {
    this.props.fetchDailyLists("dsbang", date);
  }

  RenderList() {
    if (this.props.boardDict[date]) {
      console.log(this.props.boards)
      const { classes } = this.props;
      return JSON.parse(
        this.props.boards[this.props.boardDict[date]].board_lists
      ).map(list => {
        if (this.props.cardLists[list]) {
          return (
            <Paper className={classes.list} spacing={2}>
              <List
                  board_id={this.props.boardDict[date]}
                  cardlist_id={this.props.cardLists[list].cardlist_id}
                  title={this.props.cardLists[list].cardlist_name}
              />
            </Paper>
          );
        }else{
          return <></>
        }
      });
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={2}>
        <div>Daily Todo 2020-01-22</div>

        {this.RenderList()}
        <Paper className={classes.addList} elevation={0} spacing={2}>
          <TrelloCreate board_id={this.props.boardDict["20200122"]}/>
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
