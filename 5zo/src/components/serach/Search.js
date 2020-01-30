import React, { Component } from "react";
import SearchBar from "./SearchBar";
import CardList from "./CardList";
import SearchNav from "./SearchNav";
import queryString from "query-string";




class SearchPage extends Component {
  render() {
    const card_cards = [
      { id: 1, title: 'aaaaaa', desc: 'desccccc', tags: [{ id: 1, name: 'tag1' }, { id: 2, name: 'tag2' }, { id: 3, name: 'tag3' }, { id: 4, name: 'tag4' }] },
      { id: 2, title: 'word2', desc: '4444', tags: [{ id: 1, name: 'tag1' }, { id: 3, name: 'tag3' }] },
      { id: 3, title: 'word3', desc: '111222', tags: [{ id: 2, name: 'tag2' }, { id: 4, name: 'tag4' }] },
      { id: 4, title: 'asdf', desc: 'fffff', tags: [{ id: 1, name: 'tag1' }, { id: 2, name: 'tag2' }, { id: 3, name: 'tag3' }, { id: 4, name: 'tag4' }] },
      { id: 5, title: 'zxcvz', desc: 'fdsf', tags: [{ id: 1, name: 'tag1' }, { id: 3, name: 'tag3' }] },
      { id: 6, title: '1234', desc: 'zdfx', tags: [{ id: 2, name: 'tag2' }, { id: 4, name: 'tag4' }] },
    ]
    const list_cards = [
      { id: 1, title: '카드리스트1입다', tags: [{ id: 1, name: 'tag1' }, { id: 2, name: 'tag2' }, { id: 3, name: 'tag3' }, { id: 4, name: 'tag4' }] },
      { id: 2, title: '카드55입다', tags: [{ id: 1, name: 'tag1' }, { id: 3, name: 'tag3' }] },
      { id: 3, title: '카드리21입다', tags: [{ id: 2, name: 'tag2' }, { id: 4, name: 'tag4' }] },
      { id: 4, title: '카드리스트4입다', tags: [{ id: 1, name: 'tag1' }, { id: 2, name: 'tag2' }, { id: 3, name: 'tag3' }, { id: 4, name: 'tag4' }] },
      { id: 5, title: '카드리스트15입다', tags: [{ id: 1, name: 'tag1' }, { id: 3, name: 'tag3' }] },
      { id: 6, title: '카드리스트7입다', tags: [{ id: 2, name: 'tag2' }, { id: 4, name: 'tag4' }] },
    ]
    const user_cards = [
      { id: 1, nick: '권순국', desc: '안녕하세요 권순국입니다.', image: "https://previews.123rf.com/images/artshock/artshock1209/artshock120900045/15221647-%ED%9D%B0-%EA%B5%AC%EB%A6%84%EC%9D%98-%EB%B0%B0%EA%B2%BD%EC%97%90-%ED%91%B8%EB%A5%B8-%ED%95%98%EB%8A%98%EC%97%90-%EB%A7%88%EC%9D%8C%EC%9D%98-imag-.jpg" },
      { id: 2, nick: '방대승', desc: '안녕하세요 방대승입니다.', image: "https://previews.123rf.com/images/artshock/artshock1209/artshock120900045/15221647-%ED%9D%B0-%EA%B5%AC%EB%A6%84%EC%9D%98-%EB%B0%B0%EA%B2%BD%EC%97%90-%ED%91%B8%EB%A5%B8-%ED%95%98%EB%8A%98%EC%97%90-%EB%A7%88%EC%9D%8C%EC%9D%98-imag-.jpg" },
      { id: 3, nick: '양승찬', desc: '안녕하세요 양승찬입니다.', image: "https://previews.123rf.com/images/artshock/artshock1209/artshock120900045/15221647-%ED%9D%B0-%EA%B5%AC%EB%A6%84%EC%9D%98-%EB%B0%B0%EA%B2%BD%EC%97%90-%ED%91%B8%EB%A5%B8-%ED%95%98%EB%8A%98%EC%97%90-%EB%A7%88%EC%9D%8C%EC%9D%98-imag-.jpg" },
      { id: 4, nick: '김민경', desc: '안녕하세요 김민경입니다.', image: "https://previews.123rf.com/images/artshock/artshock1209/artshock120900045/15221647-%ED%9D%B0-%EA%B5%AC%EB%A6%84%EC%9D%98-%EB%B0%B0%EA%B2%BD%EC%97%90-%ED%91%B8%EB%A5%B8-%ED%95%98%EB%8A%98%EC%97%90-%EB%A7%88%EC%9D%8C%EC%9D%98-imag-.jpg" },
      { id: 5, nick: 'ㅎㅇ', desc: '안녕하세요 ㅎㅇ입니다.', image: "https://previews.123rf.com/images/artshock/artshock1209/artshock120900045/15221647-%ED%9D%B0-%EA%B5%AC%EB%A6%84%EC%9D%98-%EB%B0%B0%EA%B2%BD%EC%97%90-%ED%91%B8%EB%A5%B8-%ED%95%98%EB%8A%98%EC%97%90-%EB%A7%88%EC%9D%8C%EC%9D%98-imag-.jpg" },
      { id: 6, nick: '나니', desc: '안녕하세요 나니입니다.', image: "https://previews.123rf.com/images/artshock/artshock1209/artshock120900045/15221647-%ED%9D%B0-%EA%B5%AC%EB%A6%84%EC%9D%98-%EB%B0%B0%EA%B2%BD%EC%97%90-%ED%91%B8%EB%A5%B8-%ED%95%98%EB%8A%98%EC%97%90-%EB%A7%88%EC%9D%8C%EC%9D%98-imag-.jpg" }
    ]

    const tag_cards = [
      { id: 1, name: 'Node.js' },
      { id: 2, name: 'React' },
      { id: 3, name: 'Java' },
      { id: 4, name: '어려어' },
      { id: 5, name: '미췬' },
      { id: 6, name: '의식의 흐름대로' },
      { id: 7, name: '우오오오오' },
    ]
    const query = queryString.parse(this.props.location.search);
    const params = this.props.match.params
    const type = query.type
    let cardList;
    switch (type) {
      case "card":
        // 
        cardList = <CardList cards={card_cards} type={"card"} />
        break;
      case "list":
        cardList = <CardList cards={list_cards} type={"list"} />
        break;
      case "user":
        cardList = <CardList cards={user_cards} type={"user"} />
        break;
      case "tag":
        cardList = <CardList cards={tag_cards} type={"tag"} />
        break;
    }

    return (

      <div>
        <SearchNav match={this.props.match} />
        {(!params.keyword) ? null : <h1> {params.keyword} 검색결과</h1>}
        <div>
          <SearchBar location={this.props.location} />
          <br />
          {cardList}
        </div>
      </div>
    )
  }
}
export default SearchPage;