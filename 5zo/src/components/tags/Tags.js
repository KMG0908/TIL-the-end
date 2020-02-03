import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { memTag } from 'actions';
import MyCloud from "./MyCloud";

const tagButtons = (tags) => tags.map((tag) =>
  <Link to={`/search/${tag.tag_name}?type=tag`} key={'link_'+tag.tag_name+tag.tag_id}>
    <Button
      variant="contained"
      key={'button_'+tag.tag_name}>
      {tag.tag_name}
    </Button>
  </Link>
);

class TagPage extends Component {
  componentDidMount(){
    this.props.memTag(this.props.mem_info.mem_id, '20000101','20200203')
  }
  render(){
    console.log(this.props.memTags)
    return (
      <>
        {/* {tagButtons(this.props.memTags ? this.props.memTags : [])} */}
        <MyCloud tags={this.props.memTags ? this.props.memTags : []}></MyCloud>
      </>
    );
  }
}

const mapStatetoProps = state => {
  return {
    mem_info : state.members.mem_info,
    memTags : state.tag.mem_tags,
  };
};

export default connect(mapStatetoProps, {memTag} )(TagPage)