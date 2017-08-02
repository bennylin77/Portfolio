import React from 'react';
import {connect} from 'react-redux';
import BennyEditor from './BennyEditor.js';
import {
  addArticle
} from 'actions/articleActions.js';
//content
export class New extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(addArticle())
  }

  render() {
    const { article, articles } = this.props;
    if (!articles || !article) {
      return <h1><i>Loading</i></h1>
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <ArticleEditor id={article.id} content={articles[article.id].content} />
          </div>
        </div>
      </div>
    );
  }
}
//connect
function mapStateToProps(state) {
  const { entities, editing} = state
  const { article } = editing
  const { articles } = entities
  return {
    article,
    articles
  }
}
const App = connect(mapStateToProps)(New);
export default App;
