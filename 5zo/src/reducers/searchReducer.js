import {SEARCH_TAG, SEARCH_CARDLIST, SEARCH_USER, SEARCH_CARD } from 'actions/types'

export default (state = {}, action) => {
    switch(action.type){
        case SEARCH_TAG:
            return{...state, 'search_tags' : action.payload}
        case SEARCH_CARDLIST:
            return{...state, 'search_cardLists' : action.payload}
        case SEARCH_USER:
            return{...state, 'search_users' : action.payload}
        case SEARCH_CARD:
            return{...state, 'search_cards' : action.payload}
        default:
            return state; 
    }
}