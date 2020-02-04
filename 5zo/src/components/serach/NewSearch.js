import React, { Component } from 'react';
import Chips from 'react-chips'
import { connect } from 'react-redux';
import { getAllTag, searchCLByTags } from 'actions';
import CardList from "./CardList";
import NewCardList from './NewCardList';

class NewSearch extends Component {
  componentDidMount() {
    this.props.getAllTag()
  }

  constructor(props) {
    super(props);
    this.state = {
      chips: [],
      cards: []
    }
  }

  onChange = chips => {
    this.setState({ chips });
    this.props.searchCLByTags(chips);
  }

  render() {
    return (
      <>
        <div style={{ position: "relative", textAlign: "center" }}>
          <div style={{ display: 'inline-block', width: 700 }}>
            <Chips
              value={this.state.chips}
              onChange={this.onChange}
              suggestions={this.props.tags ? this.props.tags : []}

            />
          <NewCardList cardLists={[1, 2, 3]} ></NewCardList>
          </div>
          <br />
        </div>
      </>
    );
  }
}

const mapStatetoProps = state => {
  return {
    tags: state.tag.tags,
    cards: state.search.cards
  };
}

export default connect(mapStatetoProps, { getAllTag, searchCLByTags })(NewSearch)