import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import { deleteCard, editCard } from "../../actions";
import TrelloForm from "./TrelloForm";
import { Draggable } from "react-beautiful-dnd";

const styles = theme => ({
  paper: {
    textAlign: "left",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
    minHeight: "60px",
    display: "flex"
  },
  delete: {
    visibility: "hidden",
    display: "none",
    right: "5px",
    bottom: "5px",
    marginLeft: "auto",
    opacity: "0.5",
    "$paper:hover &": {
      cursor: "pointer",
      visibility: "visible"
    },
    "&:hover": {
      opacity: "0.8"
    }
  }
});

class Card extends React.Component {
  state = {
    isEditing: false,
    cardText: this.props.card.card_name
  };
  saveCard = e => {
    const card = this.props.card;
    card.card_name = this.state.cardText;
    this.props.editCard(card);
    this.setState({ isEditing: false });
  };

  handleChange = e => {
    this.setState({ cardText: e.target.value });
  };

  closeForm = () => {
    this.setState({ isEditing: false });
  };

  handleDeleteCard = () => {
    this.props.deleteCard(this.props.cardlist_id, this.props.card.card_id);
  };

  renderEditForm = () => {
    return (
      <TrelloForm
        text={this.state.cardText}
        onChange={this.handleChange}
        closeForm={this.closeForm}
        submit={this.saveCard}
      >
        Save
      </TrelloForm>
    );
  };

  renderCard = () => {
    const { classes } = this.props;
    return (
      <Draggable draggableId={`card-${this.props.card_id}`} index={this.props.index}>
        {provided => (
          <Paper
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={classes.paper}
            onDoubleClick={() => this.setState({ isEditing: true })}
          >
            {this.props.card.card_name}

            <Icon
              className={classes.delete}
              fontSize="small"
              onMouseDown={this.handleDeleteCard}
            >
              delete
            </Icon>
          </Paper>
        )}
      </Draggable>
    );
  };

  render() {
    if (this.state.isEditing) {
      return this.renderEditForm();
    } else {
      return this.renderCard();
    }
  }
}

export default withStyles(styles, { withTheme: true })(
  connect(null, { deleteCard, editCard })(Card)
);
