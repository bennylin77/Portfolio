//import fetch from 'isomorphic-fetch'
const port = process.env.PORT
const domain = process.env.DOMAIN
const host = process.env.NODE_ENV == 'production'? `${domain}` : `${domain}:${port}`
export const SELECT_ARTICLE_LIST = 'SELECT_ARTICLE_LIST'
export const EDIT_ARTICLE = 'EDIT_ARTICLE'
export const REQUEST_ARTICLE = 'REQUEST_ARTICLE'
export const RECEIVE_ARTICLE = 'RECEIVE_ARTICLE'
export const REQUEST_ARTICLE_LIST = 'REQUEST_ARTICLE_LIST'
export const RECEIVE_ARTICLE_LIST = 'RECEIVE_ARTICLE_LIST'

//====================Article====================//

function editArticle(id){
  return {
    type: EDIT_ARTICLE,
    collection: 'article',
    id
  }
}
function requestArticle(id) {
  return {
    type: REQUEST_ARTICLE,
    entity: 'articles',
    id
  }
}
function receiveArticle(id, result) {
    return {
      type: RECEIVE_ARTICLE,
      receivedAt: Date.now(),
      entity: 'articles',
      result: Object.assign({}, result),
      id
    }
}
function removeArticle(id){
  return {
    type: 'REMOVE',
    entity: 'articles',
    id
  }
}
function shouldFetchArticle(state, id) {
  const article = state.entities.articles[id]
  if (!article) {
    return true
  } else if(article.isFetching) {
    return false
  } else {
    return true
  }
}
export function fetchArticleIfNeeded(id) {
  return (dispatch, getState) => {
    if (shouldFetchArticle(getState(), id)) {
      return dispatch(fetchArticle(id))
    } else {
      return Promise.resolve()
    }
  }
}

export function editAndFetchArticleIfNeeded(id) {
  return (dispatch, getState) => {
    if (shouldFetchArticle(getState(), id)) {
      return dispatch(fetchArticle(id)).then( () => dispatch(editArticle(id)) )
    } else {
      return Promise.resolve()
    }
  }
}

//-----------------------------------Article API-----------------------------------//
//fetch
function fetchArticle(id){
  return (dispatch, getState) => {
    dispatch( requestArticle(id) )
    return fetch(`${host}/api/articles/${id}`)
      .then(response => response.json())
      .then(result => dispatch(receiveArticle(id, result)))
  }
}
//add
export function addArticle(){
  return (dispatch, getState) => {
    return fetch(`${host}/api/articles/add`)
      .then(response => response.json())
      .then(result => { dispatch(receiveArticle(result.id)); return result })
      .then(result => dispatch(editArticle(result.id)))
  }
}
//update
export function updateArticle(data){
  return (dispatch, getState) => {
    return fetch(`${host}/api/articles/${data.id}`,
           { method: 'PUT',
             headers: {
               'Accept': 'application/json, text/plain, */*',
               'Content-Type': 'application/json'
             },
             body: JSON.stringify(data)})
      .then(response => response.json())
      .then(result => dispatch(receiveArticle(data.id, result)))
  }
}
//delete
export function deleteArticle(id){
  return (dispatch, getState) => {
    return fetch(`${host}/api/articles/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(result => dispatch(removeArticle(result.item.id)) )
  }
}

//====================Article list====================//
function requestArticleList(tag) {
  return {
    type: REQUEST_ARTICLE_LIST,
    tag
  }
}
function receiveArticleList(tag, result) {
    return {
      type: RECEIVE_ARTICLE_LIST,
      tag,
      articles: result.map( article => article.id ),
      receivedAt: Date.now()
    }
}
export function fetchArticleList(tag){
  return (dispatch, getState) => {
    dispatch( requestArticleList(tag) )
    return fetch(`${host}/api/articles`)
      .then(response => response.json())
      .then(result => dispatch(receiveArticleList(tag, result)))
      .then( () => {
        getState().articlesByArticle[tag].items.forEach(function(id) {
          if (shouldFetchArticle(getState(), id))
            dispatch(fetchArticle(id))
        });
      })
  }
}
/*
function shouldFetchArticleList(state, selectedArticleTag) {
  const tag = state.articlesByArticle[selectedArticleTag]
  if (!tag) {
    return true
  } else if(tag.isFetching) {
    return false
  } else {
    return true
  }
}
export function fetchArticleListIfNeeded(selectedArticleTag) {
  return (dispatch, getState) => {
    if (shouldFetchArticleList(getState(), selectedArticleTag)) {
      return dispatch(fetchArticleList(selectedArticleTag)).then( () => {
        //get each article's detail
        getState().articlesByArticle[selectedArticleTag].items.forEach(function(id) {
          if (shouldFetchArticle(getState(), id))
            dispatch(fetchArticle(id))
        });
      })
    } else {
      return Promise.resolve()
    }
  }
}
*/
