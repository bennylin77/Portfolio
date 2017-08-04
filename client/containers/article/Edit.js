import React from 'react';
import {connect} from 'react-redux';
import BennyEditor from 'components/editor/BennyEditor.js';
import {
  editAndFetchArticleIfNeeded,
  updateArticle
} from 'actions/articleActions.js';
//content
export class Edit extends React.Component {

  constructor(props) {
    super(props);
    this.handleEditorUpdate = this._handleEditorUpdate.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { id } = this.props.match.params;
    //todo get article
    dispatch(editAndFetchArticleIfNeeded(id))
    //dispatch(editArticle(id))
  }

  //editor
  _handleEditorUpdate(data){
      const { dispatch } = this.props;
      dispatch(updateArticle(data))
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
            <BennyEditor id={article.id} content={articles[article.id].content} onEditorUpdate={this.handleEditorUpdate} />
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
