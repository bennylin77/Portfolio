import React from 'react';
import {connect} from 'react-redux';
import {
  fetchArticleIfNeeded
} from 'actions/articleActions.js';

import {convertFromRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import DOMPurify from 'dompurify';
//content
class Show extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    const { id } = this.props.match.params;
    dispatch(fetchArticleIfNeeded(id))
  }

  render() {
    const { articles } = this.props;
    const { id } = this.props.match.params;
    if (!articles[id]) {
      return <h1><i>Loading</i></h1>
    }

    const content =  articles[id].content? stateToHTML(convertFromRaw( JSON.parse(articles[id].content))) : "no content"


    return (
      <div className="container" style={{"padding-top": "160px"}}>
        <div className="row">
          <div className="col-sm-12">{ articles[id].title }</div>
        </div>
        <div className="row">
          <div className="col-sm-12" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(content) }}></div>
        </div>
      </div>
    );
  }
}

//connect
function mapStateToProps(state) {
  const { entities } = state
  const { articles } = entities
  return {
    articles
  }
}
const App = connect(mapStateToProps)(Show);
export default App;
