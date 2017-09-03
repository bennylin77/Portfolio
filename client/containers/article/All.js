import React from 'react';
import Head from 'components/article/Head.js';
import List from 'components/article/List.js';
import {
  fetchArticleList,
  deleteArticle
} from 'actions/articleActions.js';
import { connect } from 'react-redux';
import {Helmet} from "react-helmet";

//content
export class All extends React.Component {

  constructor(props) {
     super(props);
     this.handleDeleteClick = this.handleDeleteClick.bind(this);
     this.isNotFetched = this.isNotFetched.bind(this);
   }
  componentDidMount() {
    const { dispatch, selectedArticleTag } = this.props;
    dispatch(fetchArticleList(selectedArticleTag))
  }
  handleDeleteClick(id) {
    const { dispatch } = this.props;
    dispatch(deleteArticle(id));
  }

  isNotFetched(){
    const { articles, article_list } = this.props
    return (!articles && !article_list) ? true : false;
  }


  render() {
    const { articles, article_list } = this.props

    if (this.isNotFetched()) {
      return <h4><i>Loading</i></h4>
    }
    return (
  		<section>
        <Helmet>
            <title>Chi Lin_ Article</title>
            <meta name="description" content="" />
        </Helmet>
        <Head/>
        <List articles={articles} articleList={article_list} onDeleteClick={this.handleDeleteClick} />
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
