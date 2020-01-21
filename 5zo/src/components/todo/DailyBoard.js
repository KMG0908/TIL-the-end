import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "./List";
import { fetchList } from "../../actions";

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
  }
});
const lists = [
  { id: 1, title: "lists1" },
  { id: 2, title: "lists2" },
  { id: 3, title: "lists3" },
  { id: 4, title: "lists3" }
];
class DailyTodo extends React.Component {
  RenderList() {
    if (this.props.board) {
      console.log(this.props.board);
    }
    const { classes } = this.props;
    return lists.map(list => (
      <Paper className={classes.list} spacing={2}>
        <List title={list.title} />
      </Paper>
    ));
  }
  render() {
    if (this.props.board){
      this.props.board.lists.map(list=>{fetchList(list)})
    }
    return (
      <Grid container spacing={2}>
        <div>Daily Todo</div>
        {this.RenderList()}
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    board: state.boards["daily"]
  };
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps,{fetchList})(DailyTodo)
);
