import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { deleteCard, editCard } from "../../actions";
import Icon from "@material-ui/core/Icon";

import Collapse from "@material-ui/core/Collapse";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Button from "@material-ui/core/Button";

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
  },
  collapseCard: {
    extAlign: "left",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
    textAlign: "left"
  },
  button: {
    float: "right",
    marginTop: theme.spacing(1)
  }
});

const today = new Date().toISOString().split("T")[0];
class CardForm extends React.Component {
  handleDeleteCard = () => {
    this.props.deleteCard(this.props.cardlist_id, this.props.card.card_id);
  };
  state = {
    enableToolbar: false,
    card_contents: this.props.card.card_contents
  };

  handleChange = content => {
    this.setState({ card_contents: content });
  };
  onEditCard = event => {
    event.stopPropagation();
    this.setState({ enableToolbar: false });
    const card = this.props.card;
    card.card_contents = this.state.card_contents;
    this.props.editCard(card);
  };
  render() {
    const { classes } = this.props;
    return (
      <div
        onClick={() => {
          if (this.props.date === today) {
            this.setState({ enableToolbar: true });
          }
        }}
      >
        <div className={classes.paper}>
          <Typography
            variant={
              this.props.editModeList === this.props.cardlist_id
                ? "h3"
                : "body1"
            }
          >
            {this.props.card.card_name}
          </Typography>
          <Icon
            className={classes.delete}
            fontSize="small"
            onMouseDown={this.handleDeleteCard}
          >
            delete
          </Icon>
        </div>
        <Collapse
          in={this.props.editModeList === this.props.cardlist_id}
          className={classes.collapseCard}
          timeout="auto"
          unmountOnExit
        >
          {this.state.enableToolbar ? (
            <SunEditor
              lang="ko"
              enable={true}
              onChange={this.handleChange}
              showToolbar={this.state.enableToolbar}
              setContents={
                this.props.card.card_contents
                  ? `${this.props.card.card_contents}`
                  : null
              }
              setOptions={{
                height: "auto",
                stickyToolbar: 50,
                placeholder: "오늘 배운 내용을 입력해주세요",
                resizingBar: false,
                buttonList: [
                  ["font", "fontSize", "formatBlock"],
                  ["bold", "underline", "italic", "strike"],
                  ["fontColor", "hiliteColor", "textStyle"],
                  ["removeFormat"],
                  ["outdent", "indent"],
                  ["align", "horizontalRule", "list", "lineHeight"],
                  ["table", "link", "image", "video"],
                  ["fullScreen", "preview", "showBlocks"]
                ]
              }}
            />
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: this.props.card.card_contents
              }}
            />
          )}

          {this.state.enableToolbar &&
          this.props.editModeList === this.props.cardlist_id ? (
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={this.onEditCard}
            >
              저장
            </Button>
          ) : null}
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    editModeList: state.editModeList
  };
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, { deleteCard, editCard })(CardForm)
);
