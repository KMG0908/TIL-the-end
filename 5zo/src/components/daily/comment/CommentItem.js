import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ReplyIcon from "@material-ui/icons/Reply";
import { Link } from "@material-ui/core";

import { connect } from "react-redux";
import { addComment, deleteComment, editComment } from "../../../actions";
import CommentForm from "./CommentForm";

const CommentItem = ({
  members,
  comment,
  cardlist_id,
  deleteComment,
  addComment,
  editComment
}) => {
  const [mode, setMode] = React.useState(false);
  const handleDelete = () => {
    deleteComment(cardlist_id, comment.comment_id);
  };

  const renderItem = () => {
    return (
      <>
        <ListItemAvatar>
          <Avatar src={comment.mem_thumb}></Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              {comment.mem_nick}{" "}
              <Typography
                variant="caption"
                display="inline"
                color="textSecondary"
                gutterBottom
              >
                {comment.comment_time}
              </Typography>
            </>
          }
          secondary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="textPrimary">
                {mode === "editing" ? (
                  <span onClick={e => e.stopPropagation()}>
                    <CommentForm
                      comment_contents={comment.comment_contents}
                      onSubmit={onEditing}
                    />
                  </span>
                ) : (
                  comment.comment_contents
                )}
              </Typography>
            </React.Fragment>
          }
        />
        <ListItemSecondaryAction>
          {comment.mem_id === members.mem_info.mem_id ? (
            <Typography
              variant="caption"
              display="inline"
              color="textSecondary"
              gutterBottom
            >
              <span onClick={setModeEditing}>수정</span>{" "}
              <span onClick={handleDelete}>삭제</span>
            </Typography>
          ) : null}
        </ListItemSecondaryAction>
      </>
    );
  };
  const setModeEditing = event => {
    event.stopPropagation();
    if (mode === "editing") {
      setMode(false);
    } else if (!comment.comment_deleted) {
      setMode("editing");
    }
  };

  const refs = React.useRef();
  const setModeCommenting = () => {
    if (mode === "commenting") {
      setMode(false);
    } else if (!comment.comment_deleted) {
      setMode("commenting");
    }
  };

  const onEditing = comment_contents => {
    const comment_reply = comment.comment_reply;
    if (comment_contents) {
      editComment(comment.cardlist_id, comment.comment_id, comment_contents);
      setMode(false);
    }
  };
  const onReplying = comment_contents => {
    const comment_reply = comment.comment_reply
      ? comment.comment_reply
      : comment.comment_id;
    if (comment_contents) {
      addComment(cardlist_id, comment_contents, comment_reply);
      setMode(false);
    }
  };
  return (
    <>
      <ListItem onClick={setModeCommenting}>
        {comment.comment_reply ? (
          <ListItemIcon>
            <ReplyIcon />
          </ListItemIcon>
        ) : null}
        {comment.comment_deleted ? "삭제된 글 입니다." : renderItem()}
      </ListItem>
      {mode === "commenting" ? (
        <div style={{ width: "90%", marginTop: "1em", float: "right" }}>
          <CommentForm
            inputRef={refs}
            comment_contents={`@${comment.mem_nick} `}
            onSubmit={onReplying}
          />
        </div>
      ) : null}
    </>
  );
};

const mapStateToProps = state => {
  return {
    members: state.members
  };
};

export default connect(mapStateToProps, {
  addComment,
  deleteComment,
  editComment
})(CommentItem);
