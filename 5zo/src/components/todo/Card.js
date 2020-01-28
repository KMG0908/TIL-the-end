import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  paper: {
    textAlign: "left",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
    minHeight: "60px"
  }
});

class Card extends React.Component {
  render() {
    const { classes } = this.props;
  return <Paper className={classes.paper}>{this.props.card.card_name}</Paper>;
  }
}

export default withStyles(styles, { withTheme: true })(connect()(Card));
