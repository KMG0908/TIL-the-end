import React from 'react';


const Card = ({card}) => {
    const style = {
        backgroundColor : 'white',
        border : '1px solid black',
    }
    return (
        <div style={style} key={card.id}>
            <h1> card title : {card.title} </h1>
            <h2> card desc : {card.desc} </h2>
            <h3> tags ===========================================================</h3>
            {card.tags.map(tag => <p key={'tag'+tag.id}>{tag.name}</p>)}
        </div>
    )
}

export default Card;