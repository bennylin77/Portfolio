import React from 'react';
import Single from 'components/article/Single.js';
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

  render() {
    const { articles, article_list } = this.props

    if (!articles) {
      return <h1><i>Loading</i></h1>
    }

    return (
  		<div className="container" style={{"padding-top": "100px"}}>
        {article_list.map( (id, i) =>
          {
            if(!articles[id])
              return <div key={id}><i>Loading</i></div>
            else
              return <Single {...this.props} key={id} article={articles[id]} onDeleteClick={this.handleDeleteClick} />
          })
        }
  		</div>
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
