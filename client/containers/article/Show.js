import React from 'react';
import Head from 'components/show/Head.js';
import Content from 'components/show/Content.js';
import {connect} from 'react-redux';
import {
  fetchArticleIfNeeded
} from 'actions/articleActions.js';
import {Helmet} from "react-helmet";

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

    //const content =  articles[id].content? stateToHTML(convertFromRaw( JSON.parse(articles[id].content))) : "no content"


    return (
      <section>
        <Helmet>
          {articles[id].title && <title>Chi Lin_ {articles[id].title}</title>}
					{articles[id].title && <meta property="og:title" content={"Chi Lin_ "+articles[id].title}/>}
          <meta name="description" content="" />
        </Helmet>
        <Head item={articles[id]}/>
        <Content item={articles[id]}/>
  		</section>
    );
  }
}



/*
      <div className="container" style={{"padding-top": "160px"}}>
        <div className="row">
          <div className="col-sm-12">{ articles[id].title }</div>
        </div>
        <div className="row">
          <div className="col-sm-12" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(content) }}></div>
        </div>
      </div>
*/
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
