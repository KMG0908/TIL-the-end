import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TrelloCreate from "./TrelloCreate";
import { connect } from "react-redux";
import Card from './Card'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    textAlign: "left",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
    minHeight: "60px"
  },
  create: {
    textAlign: "left"
  }
});

class List extends React.Component {
  renderCard() {
    const { classes } = this.props;

    const cards = Array.isArray(
      this.props.cardLists[this.props.cardlist_id].cardlist_cards
    )
      ? this.props.cardLists[this.props.cardlist_id].cardlist_cards
      : JSON.parse(this.props.cardLists[this.props.cardlist_id].cardlist_cards);

    return cards.map(card_id => {
      if (this.props.cards[card_id]) {
        return (
          <Card card={this.props.cards[card_id]} cardlist_id={this.props.cardlist_id} key={this.props.cards[card_id].key}/>
        );
      } else {
        return <></>;
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.props.title}
        {this.renderCard()}
        <Box className={classes.create} elevation={0}>
          <TrelloCreate cardlist_id={this.props.cardlist_id}/>
        </Box>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cards: state.cards,
    cardLists: state.cardLists
  };
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps)(List)
);
