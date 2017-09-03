import React from 'react';
import Head from 'components/show/Head.js';
import Content from 'components/show/Content.js';
import {connect} from 'react-redux';
import {
  fetchProjectIfNeeded
} from 'actions/projectActions.js';
import {Helmet} from "react-helmet";

//content
class Show extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    const { id } = this.props.match.params;
    dispatch(fetchProjectIfNeeded(id))
  }

  render() {
    const { projects } = this.props;
    const { id } = this.props.match.params;
    if (!projects[id]) {
      return <h1><i>Loading</i></h1>
    }
    return (
      <section>
        <Helmet>
          {projects[id].title && <title>Chi Lin_ {projects[id].title}</title>}
          <meta name="description" content="" />
        </Helmet>
        <Head item={projects[id]}/>
        <Content item={projects[id]}/>
  		</section>
    );
  }
}
//connect
function mapStateToProps(state) {
  const { entities } = state
  const { projects } = entities
  return {
    projects
  }
}
const App = connect(mapStateToProps)(Show);
export default App;
