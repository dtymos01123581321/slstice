import { combineReducers } from 'redux';
import { posts } from './reducers/postsReducers';

const rootReducer = combineReducers({
  posts,
});

export default rootReducer;
