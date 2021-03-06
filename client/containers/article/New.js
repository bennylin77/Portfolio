import React from 'react';
import {connect} from 'react-redux';
import Form from 'components/article/Form.js';
import {
  addArticle,
  updateArticle
} from 'actions/articleActions.js';
//content
export class New extends React.Component {

  constructor(props) {
    super(props);
    this.handleEditorUpdate = this._handleEditorUpdate.bind(this);
    this.handleInputChange = this._handleInputChange.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(addArticle())
  }

  _handleInputChange(target) {
    const { dispatch, article} = this.props;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const data = { id: article.id, [name]: value };
    dispatch(updateArticle(data));
  }

  //editor
  _handleEditorUpdate(content){
      const { dispatch, articles, article } = this.props;
      const data = { id: article.id, title: articles[article.id].title, content: content };
      dispatch(updateArticle(data))
  }

  render() {
    const { article, articles } = this.props;
    if (!articles || !article) {
      return <h1><i>Loading</i></h1>
    }

    return (
      <section>
        <Form onStartedAtChange={this.handleStartedAtChange}
              onInputChange={this.handleInputChange}
              article={articles[article.id]}
              editorContent={articles[article.id].content}
              onEditorUpdate={this.handleEditorUpdate}/>
      </section>
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
