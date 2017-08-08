import React from 'react';
import Single from 'components/article/Single.js';
import ArticleHead from 'components/article/ArticleHead.js';
import ArticleList from 'components/article/ArticleList.js';
import {
  fetchArticleList,
  deleteArticle
} from 'actions/articleActions.js';
import { connect } from 'react-redux';


//content
export class All extends React.Component {

  constructor(props) {
     super(props);
     this.handleDeleteClick = this.handleDeleteClick.bind(this);
   }
  componentDidMount() {
    const { dispatch, selectedArticleTag } = this.props;
    dispatch(fetchArticleList(selectedArticleTag))
  }
  handleDeleteClick(id) {
    const { dispatch } = this.props;
    dispatch(deleteArticle(id));
  }
  isFetched(){

  }
  render() {
    const { articles, article_list } = this.props

    if (!articles && !article_list) {
      return <h1><i>Loading</i></h1>
    }

    return (
  		<section>
        <ArticleHead/>
        <ArticleList articles={articles} articleList={article_list} onDeleteClick={this.handleDeleteClick} />
  		</section>
    );
  }
}

//connect
function mapStateToProps(state) {
  const { selectedArticleTag, articlesByArticle, entities: { articles: articles } }= state
  const { isFetching, lastUpdated, items: article_list } = articlesByArticle[selectedArticleTag] ||
  {isFetching: true, items: []}
  return {
    selectedArticleTag,
    articles,
    article_list
  }
}
const App = connect(mapStateToProps)(All);
export default App;
