import {
  SELECT_PROJECT_LIST,
  REQUEST_PROJECT,
  RECEIVE_PROJECT,
  REQUEST_PROJECT_LIST,
  RECEIVE_PROJECT_LIST
} from 'actions/projectActions.js'

export function selectedProjectTag(state = 'all', action) {
  switch (action.type) {
    case SELECT_PROJECT_LIST:
      return action.tag
    default:
      return state
  }
}

export function project( state = {isFetching: false}, action) {
  switch (action.type) {
    case REQUEST_PROJECT:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_PROJECT:
      return Object.assign({}, state, {
        isFetching: false,
        lastUpdated: action.receivedAt
      }, Object.assign({}, action.result))
    default:
      return state
  }
}

function project_list( state = {isFetching: false, items: []}, action) {
  switch (action.type) {
    case REQUEST_PROJECT_LIST:
      return { ...state,
               isFetching: true}
    case RECEIVE_PROJECT_LIST:
      return { ...state,
               isFetching: false,
               items: action.projects,
               lastUpdated: action.receivedAt
             }
    default:
      return state
  }
}

export function projectListInProject(state = {}, action) {
  switch (action.type) {
    case REQUEST_PROJECT_LIST:
    case RECEIVE_PROJECT_LIST:
      return {...state, [action.tag]: project_list(state[action.tag], action)}
    default:
      return state
  }
}
