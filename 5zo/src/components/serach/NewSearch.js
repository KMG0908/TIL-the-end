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
      limit: 5,
      stateFun : this.loader(),
      state : 'loader'
    }
    let update = false
  }

  onChange = chips => {
    this.setState({
      chips,
      page: 1,
      cardLists: [],
      state : 'loader',
      stateFun : this.loader(),
    });
    
    this.props.searchCardlist(chips, this.state.page, this.state.limit);
  }
  
  onScrolled = async () => {
    const { chips, page, cardLists, limit, state, stateFun } = this.state
    if(state === 'end'){
      return
    }
    let keywords_string = ",";
    chips.map(keyword => keywords_string += encodeURI(keyword) + ',')

    const response = await apis.get(
      `/search/global/cardlist/by/${keywords_string}?limit=${limit}&page=${page}`
    );
    const data = response.data.data
    console.log(`/search/global/cardlist/by/${keywords_string}?limit=${limit}&page=${page}`)
    console.log(data)
    if (data.length != 0) {
      this.setState({
        cardLists: cardLists.concat(response.data.data),
        page: this.state.page + 1
      })
    } else {
      this.setState({
        state : 'end',
        stateFun : this.end()
      })
    }
  }
  loader = () => (<div className="loader" key={0}>Loading ...</div>)
  end = () => (<div className="end" key={1}> 불러올 데이터가 없습니다. </div>)


  render() {
    return (
      <>
        <div style={{ position: "relative", textAlign: "center" }}>
          <div style={{ display: 'inline-block', width: widthPer }}>

            <div style={{ textAlign: 'left' }}>
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
                loader={this.state.stateFun}
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