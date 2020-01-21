import React, {useState, useCallback} from 'react';
import { Link } from 'react-router-dom';

const SearchBar = ({onInsert}) => {
    const [searchText, setSearchText] = useState('');

    const onChangeSearchText = useCallback(e => {
        setSearchText(e.target.value);
    },[]);

    return (
        <div>
            <input type='text' value={searchText} onChange={onChangeSearchText} ></input>
            <Link to={'/search/' + searchText}>
                <button type='button' >검색</button>
            </Link>
        </div>
    );
};

export default SearchBar;