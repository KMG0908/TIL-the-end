import React from 'react';
import Card from './Card';

const CardList = ({cards}) => {
    return (
        <div>
            {
                cards.map(card=> <Card card={card} key={card.id}/>)
            }
        </div>
    )
}

export default CardList;