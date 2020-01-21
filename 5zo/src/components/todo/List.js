import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    textAlign: "left",
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    minHeight: "80px",
  }
}));

const List = props => {
  const classes = useStyles();
  const cards = [
    { id: 1, title: "card1" },
    { id: 2, title: "card2" }
  ];

  const renderCard = () => {
    return cards.map(card => <Paper className={classes.paper} key={card.key}>{card.title}</Paper>);
  };
  return (
    <div>
      {props.title}
      {renderCard()}
    </div>
  );
};

export default List;
