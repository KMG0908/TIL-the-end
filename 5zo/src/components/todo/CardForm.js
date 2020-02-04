import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { deleteCard } from "../../actions";
import Icon from "@material-ui/core/Icon";

import Collapse from "@material-ui/core/Collapse";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

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
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
    textAlign: "left"
  }
});

class CardForm extends React.Component {
  handleDeleteCard = () => {
    this.props.deleteCard(this.props.cardlist_id, this.props.card.card_id);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.paper}>
          <Typography variant={this.props.editMode ? "h3" : "body1"}>
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
          in={this.props.editMode}
          className={classes.collapseCard}
          timeout="auto"
          unmountOnExit
        >
          <hr />
          <SunEditor
            lang="ko"
            enable={true}
            setContents={`<div style="font-size:50px">zzzzzzz</div>`}
            setOptions={{ height : "auto", stickyToolbar : 50}}
          />
        </Collapse>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(
  connect(null, { deleteCard })(CardForm)
);
