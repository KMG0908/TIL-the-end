import React from "react";
import Input from "@material-ui/core/Input";
import { addComment } from "../../../actions";
import { connect } from "react-redux";
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";

function CommentForm(props) {
  const [comment_contents, setCommentContents] = React.useState(
    props.comment_contents ? props.comment_contents : ""
  );

  const handleSubmit = event => {
    event.preventDefault();
    props.onSubmit(comment_contents);
    setCommentContents(props.comment_contents ? props.comment_contents : "");
  };
  return (
    <div className={props.inputRef? "write_reply" : ""}>
      <ListItem>
        <ListItemIcon style={{display: props.inputRef? "flex" : "none"}}>
          <SubdirectoryArrowRightIcon style={{color: "rgba(0, 0, 0, 0.3)"}} />
        </ListItemIcon>
        <div className={props.inputRef? "reply_window" : "comment_window"}>
          <form style={{ width: "100%", height: "100%", marginRight: '10px', display: 'flex', alignItems: 'center'}}>
            <Input
              inputRef={props.inputRef}
              style={{ width: "93%", height: "100%", wordBreak: "break-all" }}
              placeholder="격려의 댓글을 달아주세요^^"
              onChange={e => setCommentContents(e.target.value)}
              value={comment_contents}
              disableUnderline
              multiline
              inputProps={{maxLength:200}}
            />
            <Button variant="outlined" className="comment_register" onClick={handleSubmit}>등록</Button>
          </form>
        </div>
      </ListItem>
    </div>
  );
}

export default CommentForm;
