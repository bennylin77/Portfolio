import {
  EDIT_ARTICLE
} from '../actions/articleActions.js'
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import entities from './entities.js';
import { selectedArticleTag, articlesByArticle } from './articles.js';

function editing(state = {}, action) {
  switch (action.type) {
    case EDIT_ARTICLE:
      return Object.assign({}, state, {
        [action.collection]: { id: action.id }
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({selectedArticleTag, entities, articlesByArticle, editing, router: routerReducer });

export default rootReducer;
