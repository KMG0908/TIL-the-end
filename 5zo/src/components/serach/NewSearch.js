import React, { Component } from 'react';
import Chips from 'react-chips'
import { connect } from 'react-redux';
import { getAllTag, searchCardlist } from 'actions';
import NewCard from './NewCard'

const widthPer = '50%'

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
    this.props.searchCardlist(chips);
  }

  render() {
    console.log('render')
    console.log(this.props.cardLists)
    return (
      <>
        <div style={{ position: "relative", textAlign: "center" }}>
          <div style={{ display: 'inline-block', width: widthPer }}>
            <Chips
              value={this.state.chips}
              placeholder={"키워드를 입력 후 콤마 ( , ) 를 눌러 추가하세요. ( ex. #aaa + ',' ) "}
              onChange={this.onChange}
              suggestions={this.props.tags ? this.props.tags : []}
            />
            <div>

              {this.props.cardLists ? this.props.cardLists.map(cardList => <NewCard cardList={cardList} widthPer = {widthPer} key={`newCard${cardList.cardlist_id}`}/>) : null}


            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStatetoProps = state => {
  return {
    tags: state.tag.tags,
    cardLists: state.search.cardLists
  };
}

export default connect(mapStatetoProps, { getAllTag, searchCardlist })(NewSearch)