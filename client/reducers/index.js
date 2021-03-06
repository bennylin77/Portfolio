import {
  EDIT_ARTICLE
} from 'actions/articleActions.js'
import {
  EDIT_PROJECT
} from 'actions/projectActions.js'
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import entities from './entities.js';
import { selectedArticleTag, articlesByArticle } from './articles.js';
import { selectedProjectTag, projectListInProject } from './projects.js';


function editing(state = {}, action) {
  switch (action.type) {
    case EDIT_ARTICLE:
    case EDIT_PROJECT:
      return Object.assign({}, state, {
        [action.collection]: { id: action.id }
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({ selectedProjectTag, selectedArticleTag, entities, articlesByArticle, editing, projectListInProject, router: routerReducer });
export default rootReducer;
