import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {} from "../../actions";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import "typeface-roboto";
import SubPost from "./SubPost";

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(3)
  }
}));

const renderSubPost = props => {
  return props.cardLists[props.list_id].cardlist_cards.map(card_id => {
    if (props.cards[card_id]) {
      console.log(props.cards[card_id])
      return <SubPost card_id={card_id} key={card_id} />;
    }
  });
};

const Post = props => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography variant="h3">
        {props.cardLists[props.list_id].cardlist_name}
      </Typography>
        <hr/>
      {renderSubPost(props)}
    </Paper>
  );
};

const mapStateToProps = state => {
  return {
    cardLists: state.cardLists,
    cards: state.cards
  };
};

export default connect(mapStateToProps)(Post);
