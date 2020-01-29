import React from 'react';
import CardCard from './CardCard';
import UserCard from './UserCard';
import ListCard from './ListCard';
import TagCard from './TagCard';

const CardList = ({cards, type}) => {
    switch (type) {
        case 'card':
            return cards.map(card=> <CardCard card={card} key={card.id}/>)
        case 'user':
            return cards.map(user=> <UserCard user={user} key={user.id}/>)
        case 'tag':
            return cards.map(tag=> <TagCard tag={tag} key={tag.id} />)
        case 'list':
            return cards.map(list=> <ListCard list={list} key={list.id}/>)
    }
}
export default CardList;