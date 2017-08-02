import React from 'react';
import {connect} from 'react-redux';
import BennyEditor from './BennyEditor.js';
//import DanteEditor from './DanteEditor.js'
//import PluginsEditor from './PluginsEditor.jsx';
import {
  editAndFetchArticleIfNeeded
} from 'actions/articleActions.js';
//content
export class Edit extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    const { id } = this.props.match.params;
    //todo get article
    dispatch(editAndFetchArticleIfNeeded(id))
    //dispatch(editArticle(id))
  }

  render() {
    const { articles, article } = this.props;

    if (!articles || !article) {
      return <h1><i>Loading</i></h1>
    }

    if (article.id != this.props.match.params.id){
      return <h1><i>Loading</i></h1>
    }

    return (
      <div className="container" style={{"padding-top": "100px"}}>
        <div className="row">
          <div className="col-sm-12">
            <BennyEditor id={article.id} content={articles[article.id].content} />
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
const App = connect(mapStateToProps)(Edit);
export default App;
