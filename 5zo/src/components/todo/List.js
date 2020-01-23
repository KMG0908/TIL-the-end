import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import TrelloCreate from "./TrelloCreate";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    textAlign: "left",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
    minHeight: "60px",
  },
  create: {
    textAlign: "left"
  }
}));

const List = props => {
  const classes = useStyles();
  const cards = [
    { id: 1, title: "card1" }
  ];

  const renderCard = () => {
    return cards.map(card => <Paper className={classes.paper} key={card.key}>{card.title}</Paper>);
  };
  return (
    <div>
      {props.title}
      {renderCard()}
      <Box className={classes.create} elevation={0} >
      <TrelloCreate />
      </Box>
    </div>
  );
};

export default List;
