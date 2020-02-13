import React from "react";
import CommentAddForm from "./CommentAddForm";
import { connect } from "react-redux";
import { fetchComments } from "../../actions";
class Comment extends React.Component {
  componentDidMount() {
    const { fetchComments, list_id } = this.props;
    fetchComments(list_id);
  }

  renderComments = () => {
    const { comments, list_id } = this.props;
    console.log(comments[list_id]);

    if (comments[list_id]) {
      return Object.values(comments[list_id]).map(comment => {
        return <div>{comment.comment_contents}</div>;
      });
    }
  };
  render() {
    const { list_id } = this.props;
    return (
      <div>
        {this.renderComments()}
        <CommentAddForm list_id={list_id} comment_reply={0} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: state.comments
  };
};

export default connect(mapStateToProps, { fetchComments })(Comment);
