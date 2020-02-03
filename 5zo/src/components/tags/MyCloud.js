import React, { Component } from "react";
import { TagCloud } from 'react-tagcloud'

const SimpleCloud = ({ tags }) => {
    const data = []
    tags.map(tag => data.push({
        'value' : tag.tag_name,
        'count' : tag.tag_id
    }))
    
    const handleClick = (tag) => {
        window.location.href = `/search/${tag.value}?type:tag`
    }

    return(
    <>
        <TagCloud
            minSize={30}
            maxSize={100}
            tags={data}
            onClick={tag => handleClick(tag) }
        />
    </>
    )
}

export default SimpleCloud