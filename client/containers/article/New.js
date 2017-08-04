import React from 'react';
import {connect} from 'react-redux';
import BennyEditor from 'components/editor/BennyEditor.js';
import {
  addArticle,
  updateArticle
} from 'actions/articleActions.js';
//content
export class New extends React.Component {

  constructor(props) {
    super(props);
    this.handleEditorUpdate = this._handleEditorUpdate.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(addArticle())
  }

  //editor
  _handleEditorUpdate(data){
      const { dispatch } = this.props;
      dispatch(updateArticle(data))
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
const App = connect(mapStateToProps)(New);
export default App;
