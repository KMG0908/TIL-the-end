import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "./List";

const useStyles = makeStyles(theme => ({
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
}));

const DailyTodo = () => {
  const classes = useStyles();
  const lists = [
    { id: 1, title: "lists1" },
    { id: 2, title: "lists2" },
    { id: 3, title: "lists3" },
    { id: 4, title: "lists3" }
  ];
  function RenderList() {
    return lists.map(list => (
      <Paper className={classes.list} spacing={2}>
        <List title={list.title} />
      </Paper>
    ));
  }

  return (
    <Grid container spacing={2}>
      <div>Daily Todo</div>
      {RenderList()}
    </Grid>
  );
};

export default DailyTodo;
