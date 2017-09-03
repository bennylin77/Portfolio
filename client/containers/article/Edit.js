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
    this.handleInputChange = this._handleInputChange.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { id } = this.props.match.params;
    //todo get article
    dispatch(editAndFetchArticleIfNeeded(id))
    //dispatch(editArticle(id))
  }

  _handleInputChange(event) {
    const { dispatch, article} = this.props;
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const data = { id: article.id, [name]: value };
    dispatch(updateArticle(data));
  }

  //editor
  _handleEditorUpdate(content){
    const { dispatch, articles, article} = this.props;
    const data = { id: article.id, title: articles[article.id].title, content: content };
    dispatch(updateArticle(data));
  }

  render() {
    const { articles, article } = this.props;

    if (!articles || !article) {
      return <h1><i>Loading</i></h1>
    }

    if (article.id != this.props.match.params.id){
      return <h1><i>Loading</i></h1>
    }
    //console.log(articles[article.id].title)
    return (
      <div className="container" style={{padding: '100px'}}>
        <div className="row">
          <div className="col-sm-12">
            <input type="text" name="title" value={ !articles[article.id].title ? "": articles[article.id].title } onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <BennyEditor content={articles[article.id].content} onEditorUpdate={this.handleEditorUpdate} />
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
