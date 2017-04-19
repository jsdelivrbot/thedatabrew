import { FETCH_POSTS, FETCH_ASSETS, FETCH_POST, FETCH_ASSET, FETCH_PAGE } from '../actions/index';

// all: all blog posts, post: selected blog post
const INITIAL_STATE = { all: [], post: null, assets: [], page: null };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
    case FETCH_POSTS:
        return { ...state, all: action.payload.data };
    case FETCH_POST:
        return { ...state, post: action.payload.data };
    case FETCH_ASSETS:
        return {...state, assets: action.payload.data };
    case FETCH_ASSET:
        return {...state, asset: action.payload.data };
    case FETCH_PAGE:
        return {...state, page: action.payload.data };
    default:
        return state;
    }
}
