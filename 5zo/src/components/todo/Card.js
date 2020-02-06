import React from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { editCard } from "../../actions";
import TrelloForm from "./TrelloForm";
import { Draggable } from "react-beautiful-dnd";

import CardForm from "./CardForm";

const today = new Date().toISOString().split("T")[0];
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
    return (
      <Draggable
        draggableId={`card-${this.props.card_id}`}
        index={this.props.index}
        isDragDisabled={!(!this.props.date||this.props.date>=today)}
      >
        {provided => (
          <Paper
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onDoubleClick={() => this.setState({ isEditing: true })}
            expanded={this.props.editModeList === this.props.cardList}
          >
            <CardForm
              date={this.props.date ? this.props.date : null}
              card={this.props.card}
              cardlist_id={this.props.cardlist_id}
            />
          </Paper>
        )}
      </Draggable>
    );
  };

  render() {
    if (this.state.isEditing&&(this.props.date >= today || !this.props.date)) {
      return this.renderEditForm();
    } else {
      return this.renderCard();
    }
  }
}

const mapStateToProps = state => {
  return { editModeList: state.editModeList };
};

export default connect(null, { editCard })(Card);
