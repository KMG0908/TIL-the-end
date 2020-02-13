import React from "react";
import Input from "@material-ui/core/Input";
import { addComment } from "../../actions";
import { connect } from "react-redux";

function CommentAddForm(props) {
  const { list_id, comment_reply, addComment } = props;
  const [comment_contents, setCommentContents] = React.useState(
    props.comment_contents ? props.comment_contents : ""
  );

  const handleSubmit = event => {
    event.preventDefault();
    addComment(list_id, comment_contents, comment_reply);
    setCommentContents("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        style={{ width: "100%" }}
        placeholder="격려의 댓글을 달아주세요^^"
        onChange={e => setCommentContents(e.target.value)}
        value={comment_contents}
      />
    </form>
  );
}

export default connect(null, { addComment })(CommentAddForm);
