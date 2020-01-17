import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import List from "./List";

import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag, generateItems } from "./utils";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  list: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    minHeight: "200px",
    width: "300px"
  }
}));

function onColumnDrop(dropResult) {
  const scene = Object.assign({}, this.state.scene);
  scene.children = applyDrag(scene.children, dropResult);
  this.setState({
    scene
  });
}

function Lists() {
  const classes = useStyles();
  const lists = [
    { id: 1, title: "lists1" },
    { id: 2, title: "lists2" },
    { id: 3, title: "lists3" },
    { id: 4, title: "lists3" }
  ];
  function RenderList() {
    return lists.map(list => (
      <Grid item spacing={2}>
        <Paper className={classes.list}>
          <List title={list.title} />
        </Paper>
      </Grid>
    ));
  }

  return <Grid container spacing={2}>{RenderList()}</Grid>;
}

export default Lists;
