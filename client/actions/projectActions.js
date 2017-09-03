//import fetch from 'isomorphic-fetch'
const port = (process.env.PORT || 8080)

export const SELECT_PROJECT_LIST = 'SELECT_PROJECT_LIST'
export const EDIT_PROJECT = 'EDIT_PROJECT'
export const REQUEST_PROJECT = 'REQUEST_PROJECT'
export const RECEIVE_PROJECT = 'RECEIVE_PROJECT'
export const REQUEST_PROJECT_LIST = 'REQUEST_PROJECT_LIST'
export const RECEIVE_PROJECT_LIST = 'RECEIVE_PROJECT_LIST'

//====================Project====================//

function editProject(id){
  return {
    type: EDIT_PROJECT,
    collection: 'project',
    id
  }
}
function requestProject(id) {
  return {
    type: REQUEST_PROJECT,
    entity: 'projects',
    id
  }
}
function receiveProject(id, result) {
    return {
      type: RECEIVE_PROJECT,
      receivedAt: Date.now(),
      entity: 'projects',
      result: Object.assign({}, result),
      id
    }
}
function removeProject(id){
  return {
    type: 'REMOVE',
    entity: 'projects',
    id
  }
}
function shouldFetchProject(state, id) {
  const project = state.entities.projects[id]
  if (!project) {
    return true
  } else if(project.isFetching) {
    return false
  } else {
    return true
  }
}
export function fetchProjectIfNeeded(id) {
  return (dispatch, getState) => {
    if (shouldFetchProject(getState(), id)) {
      return dispatch(fetchProject(id))
    } else {
      return Promise.resolve()
    }
  }
}

export function editAndFetchProjectIfNeeded(id) {
  return (dispatch, getState) => {
    if (shouldFetchProject(getState(), id)) {
      return dispatch(fetchProject(id)).then( () => dispatch(editProject(id)) )
    } else {
      return Promise.resolve()
    }
  }
}

//-----------------------------------Project API-----------------------------------//
//fetch
function fetchProject(id){
  return (dispatch, getState) => {
    dispatch( requestProject(id) )
    return fetch(`http://www.chi-lin.com:${port}/api/projects/${id}`)
      .then(response => response.json())
      .then(result => dispatch(receiveProject(id, result)))
  }
}
//add
export function addProject(){
  return (dispatch, getState) => {
    return fetch(`http://www.chi-lin.com:${port}/api/projects/add`)
      .then(response => response.json())
      .then(result => { dispatch(receiveProject(result.id)); return result })
      .then(result => dispatch(editProject(result.id)))
  }
}
//update
export function updateProject(data){
  return (dispatch, getState) => {
    return fetch(`http://www.chi-lin.com:${port}/api/projects/${data.id}`,
           { method: 'PUT',
             headers: {
               'Accept': 'application/json, text/plain, */*',
               'Content-Type': 'application/json'
             },
             body: JSON.stringify(data)})
      .then(response => response.json())
      .then(result => dispatch(receiveProject(data.id, result)))
  }
}
//delete
export function deleteProject(id){
  return (dispatch, getState) => {
    return fetch(`http://www.chi-lin.com:${port}/api/projects/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(result => dispatch(removeProject(result.item.id)) )
  }
}

//====================Project list====================//
function requestProjectList(tag) {
  return {
    type: REQUEST_PROJECT_LIST,
    tag
  }
}
function receiveProjectList(tag, result) {
    return {
      type: RECEIVE_PROJECT_LIST,
      tag,
      projects: result.map( project => project.id ),
      receivedAt: Date.now()
    }
}
export function fetchProjectList(tag){
  return (dispatch, getState) => {
    dispatch( requestProjectList(tag) )
    return fetch(`http://www.chi-lin.com:${port}/api/projects`)
      .then(response => response.json())
      .then(result => dispatch(receiveProjectList(tag, result)))
      .then( () => {
        getState().projectListInProject[tag].items.forEach(function(id) {
          if (shouldFetchProject(getState(), id))
            dispatch(fetchProject(id))
        });
      })
  }
}
