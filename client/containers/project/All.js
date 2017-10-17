import React from 'react';
import Head from 'components/project/Head.js';
import List from 'components/project/List.js';
import {
  fetchProjectList,
  deleteProject
} from 'actions/projectActions.js';
import { connect } from 'react-redux';
import {Helmet} from "react-helmet";

//content
export class All extends React.Component {

  constructor(props) {
     super(props);
     this.handleDeleteClick = this.handleDeleteClick.bind(this);
     this.isNotFetched = this.isNotFetched.bind(this);
   }
  componentDidMount() {
    const { dispatch, selectedProjectTag } = this.props;
    dispatch(fetchProjectList(selectedProjectTag))
  }
  handleDeleteClick(id) {
    const { dispatch } = this.props;
    dispatch(deleteProject(id));
  }

  isNotFetched(){
    const { projects, project_list } = this.props
    return (!projects && !project_list) ? true : false;
  }

  render() {
    const { projects, project_list } = this.props

    if (this.isNotFetched()) {
      return <h1><i>Loading</i></h1>
    }
    return (
  		<section>
        <Helmet>
            <title>Chi Lin_ Project</title>
						<meta property="og:title" content="Chi Lin_ Project"/>
            <meta name="description" content="" />
        </Helmet>
        <Head/>
        <List projects={projects} projectList={project_list} onDeleteClick={this.handleDeleteClick} />
  		</section>
    );
  }
}

//connect
function mapStateToProps(state) {
  const { selectedProjectTag, projectListInProject, entities: { projects: projects } }= state
  const { isFetching, lastUpdated, items: project_list } = projectListInProject[selectedProjectTag] ||
  {isFetching: true, items: []}
  return {
    selectedProjectTag,
    projects,
    project_list
  }
}
const App = connect(mapStateToProps)(All);
export default App;
