
import {
  REQUEST_ARTICLE,
  RECEIVE_ARTICLE,
} from 'actions/articleActions.js'
import {
  REQUEST_PROJECT,
  RECEIVE_PROJECT,
} from 'actions/projectActions.js'
import { article } from './articles.js';
import { project } from './projects.js';

const entities = (state = { articles: {}, projects: {} }, action) => {
  switch (action.type) {
    case REQUEST_ARTICLE:
    case RECEIVE_ARTICLE:
      return Object.assign({}, state, {
        [action.entity]:  Object.assign({},
                          state[action.entity],
                          { [action.id]: article( state[action.entity][action.id], action) })
      })
    case REQUEST_PROJECT:
    case RECEIVE_PROJECT:
      return Object.assign({}, state, {
        [action.entity]:  Object.assign({},
                          state[action.entity],
                          { [action.id]: project( state[action.entity][action.id], action) })
      })
    case 'REMOVE':
      return Object.assign({}, state, {
             [action.entity]: Object.keys(state[action.entity]).reduce((result, key) => {
                              if (key !== action.id) {
                                  result[key] = state[action.entity][key];
                              }
                              return result;
          }, {})
      });
    default:
      return state
  }
}

export default entities;
