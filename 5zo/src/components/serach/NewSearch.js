import React, { Component } from 'react';
import Chips from './ChipLibrary/Chips'
import { connect } from 'react-redux';
import { getAllTag, searchCardlist } from 'actions';
import NewCard from './NewCard'
import apis from "../../apis/apis";
import InfiniteScroll from 'react-infinite-scroller';

const widthPer = 600

class NewSearch extends Component {
  componentDidMount() {
    this.props.getAllTag()

  }

  constructor(props) {
    super(props);
    this.state = {
      chips: [],
      cardLists: [],
      page: 1,
    }
    let update = false
    const limit = 10
  }

  onChange = chips => {
    this.setState({ chips,
      page : 1,
      cardLists : []
    });
    this.props.searchCardlist(chips, this.state.page, this.limit);
  }

  onScrolled = async () => {
    const { chips, page, cardLists } = this.state
      let keywords_string = ",";
      chips.map(keyword => keywords_string += encodeURI(keyword) + ',')
      console.log('keywords : ' + keywords_string)
      const response = await apis.get(
        `/search/global/cardlist/by/${keywords_string}`
        // `/search/global/cardlist/by/${keywords_string}?limit=${limit}&page=${page}`
      );

      this.setState({
        cardLists: cardLists.concat(response.data.data)
      })
  }

  render() {
    return (
      <>
        <div style={{ position: "relative", textAlign: "center" }}>
          <div style={{ display: 'inline-block', width: widthPer }}>
              
            <div style = {{textAlign : 'left'}}>
            <Chips
              value={this.state.chips}
              placeholder={`태그 : # + keyword , 유저 : @ + keyword , 검색 키워드 : keyword`}
              onChange={this.onChange}
              suggestions={this.props.tags ? this.props.tags : []}
            />
            </div>
            <div>
              <InfiniteScroll
                pageStart={0}
                loadMore={this.onScrolled}
                hasMore={true || false}
                loader={<div className="loader" key={0}>Loading ...</div>}
              >
                {this.state.cardLists ? this.state.cardLists.map(cardList => <NewCard cardList={cardList} widthPer={widthPer} key={`newCard${cardList.cardlist_id}`} />) : null}
              </InfiniteScroll>

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