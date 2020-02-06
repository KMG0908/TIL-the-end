import React from "react";
import { Typography } from "@material-ui/core";
import "typeface-roboto";
import { connect } from "react-redux";

const SubPost = props => {
  return (
    <>
      <Typography variant="h4">
        {props.cards[props.card_id].card_name}
      </Typography>

      <div
        dangerouslySetInnerHTML={{
          __html: props.cards[props.card_id].card_contents
        }}
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    cards: state.cards
  };
};

export default connect(mapStateToProps)(SubPost);
