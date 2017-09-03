import React from 'react';
import {connect} from 'react-redux';
import Form from 'components/project/Form.js';
import BennyEditor from 'components/editor/BennyEditor.js';
import {
  addProject,
  updateProject
} from 'actions/projectActions.js';
//content
export class New extends React.Component {

  constructor(props) {
    super(props);
    this.handleEditorUpdate = this._handleEditorUpdate.bind(this);
    this.handleInputChange = this._handleInputChange.bind(this);
    this.handleStartedAtChange = this._handleStartedAtChange.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(addProject())
  }

  _handleInputChange(target) {
    const { dispatch, project} = this.props;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const data = { id: project.id, [name]: value };
    dispatch(updateProject(data));
  }

  _handleStartedAtChange(value) {
    const { dispatch, project} = this.props;
    const data = { id: project.id, startedAt: value };
    dispatch(updateProject(data));
  }

  //editor
  _handleEditorUpdate(content){
    const { dispatch, projects, project } = this.props;
    const data = { id: project.id, title: projects[project.id].title, content: content };
    dispatch(updateProject(data))
  }

  render() {
    const { project, projects } = this.props;
    if (!projects || !project) {
      return <h1><i>Loading</i></h1>
    }

    return (
      <section>
        <Form onStartedAtChange={this.handleStartedAtChange}
              onInputChange={this.handleInputChange}
              project={projects[project.id]}
              editorContent={projects[project.id].content}
              onEditorUpdate={this.handleEditorUpdate}/>
      </section>
    );
  }
}
//connect
function mapStateToProps(state) {
  const { entities, editing} = state
  const { project } = editing
  const { projects } = entities
  return {
    project,
    projects
  }
}
const App = connect(mapStateToProps)(New);
export default App;
