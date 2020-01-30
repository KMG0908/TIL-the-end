import React, { Component } from 'react';
import CardCard from './CardCard';
import MemberCard from './MemberCard';
import ListCard from './ListCard';
import TagCard from './TagCard';
import { connect } from "react-redux";
import { searchKeyword } from 'actions';

class CardList extends Component {
    componentDidMount() {
        let type = this.props.type
        let keyword = this.props.keyword
        
        if (keyword === undefined) return
        console.log(`componentDidMount - params.keyword : ${keyword} , type : ${type}`)
        this.props.searchKeyword(keyword, type)
        console.log('마지막')
    }
    // componentDidUpdate() {
    //     let type = this.props.type
    //     let keyword = this.props.keyword

    //     if (keyword === undefined) return
    //     this.props.searchKeyword(keyword, type)
    //     console.log(`componentDidMount - params.keyword : ${keyword} , type : ${type}`)
    //     console.log('마지막')
    // }
    state = {
        type : this.props.type,
        keyword : this.props.keyword
    }
    constructor(props){
        super(props)
    }
    setState_ = (props) =>{
        this.setState({
            type : props.type,
            keyword : props.keyword
        })
    }
    render() {
        console.log('cardList----------------------------------')
        let type = this.props.type
        console.log('type : ' + type)
        let keyword = this.props.keyword
        if(this.props.cards){
            switch (type) {
                case 'member':
                    return this.props.cards.map(member => <MemberCard member={member} key={member.id} />)
                case 'tag':
                    return this.props.cards.map(tag => <TagCard tag={tag} key={tag.id} />)
                case 'cardlist':
                    return this.props.cards.map(list => <ListCard list={list} key={list.id} />)
                default:
                    return this.props.cards.map(card => <CardCard card={card} key={card.id} />)
            }
        }
        return ("")
    }
}

const mapStatetoProps = state => {
    return {
        cards: state.search.cards
    };
}
export default connect(mapStatetoProps, { searchKeyword })(CardList)
// export default CardList;