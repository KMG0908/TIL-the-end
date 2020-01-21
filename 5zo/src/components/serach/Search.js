import React from "react";
import SearchBar from "./SearchBar";
import CardList from "./CardList";
export default function searchPage(props){

  const dummy_cards = [
    {id : 1, title : 'aaaaaa', desc : 'desccccc', tags : [{ id : 1, name : 'tag1'}, { id : 2, name : 'tag2'}, { id : 3, name : 'tag3'}, { id : 4, name : 'tag4'}]},
    {id : 2, title : 'word2', desc : '4444', tags : [{ id : 1, name : 'tag1'}, { id : 3, name : 'tag3'}]},
    {id : 3, title : 'word3', desc : '111222', tags : [{ id : 2, name : 'tag2'}, { id : 4, name : 'tag4'}]},
    {id : 4, title : 'asdf', desc : 'fffff', tags : [{ id : 1, name : 'tag1'}, { id : 2, name : 'tag2'}, { id : 3, name : 'tag3'}, { id : 4, name : 'tag4'}]},
    {id : 5, title : 'zxcvz', desc : 'fdsf', tags : [{ id : 1, name : 'tag1'}, { id : 3, name : 'tag3'}]},
    {id : 6, title : '1234', desc : 'zdfx', tags : [{ id : 2, name : 'tag2'}, { id : 4, name : 'tag4'}]},
  ]

  const dummy_tags = [
    { id: 1, name: 'Node.js' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Java' },
    { id: 4, name: '어려어' },
    { id: 5, name: '미췬' },
    { id: 6, name: '의식의 흐름대로' },
    { id: 7, name: '우오오오오' },
  ]


  return (
    <div>
      <h1> {props.title} 검색결과</h1>
      <div> page title : search</div>
      <div>
        <SearchBar/>
        <div> 잔디 </div>
        <CardList cards={dummy_cards}/>
      </div>
    </div>
  )
}