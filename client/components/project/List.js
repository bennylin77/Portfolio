import React from 'react';
import { Grid, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './styles/project.css';
import Transition from 'react-transition-group/Transition';
import Waypoint from 'react-waypoint';
//ProjectList
class ProjectList extends React.Component {
    constructor(props) {
      super(props)
    }
    render() {
      const { projectList, projects, onDeleteClick } = this.props;
      return (
        <Grid className="project_list_holder">
          <div className="project_list_header"></div>
          <ul className="timeline">
              { projectList.map( (id, index) =>
                    projects[id] && <ListItem {...this.props} key={id} project={projects[id]} onDeleteClick={onDeleteClick} isInvert={index%2!=0} />
              )}
          </ul>
          <div className="project_list_footer"></div>
        </Grid>
      )
    }
};

//ListItem
class ListItem extends React.Component{
  constructor(props) {
    super(props)
    this.state = { in: false };
    this.handlePositionChange = (previousPosition, currentPosition) => this._handlePositionChange(previousPosition, currentPosition);
    this.handleDelete = this.handleDelete.bind(this);
  }

  _handlePositionChange(previousPosition, currentPosition){
    if(currentPosition == Waypoint.inside)
      this.setState((prevState, props) => ({
        in: true
      }));
    else if (currentPosition == Waypoint.below){
      this.setState((prevState, props) => ({
        in: false
      }));
    }
  }

  handleDelete(e){
    const { project, onDeleteClick} = this.props;
    e.preventDefault();
    onDeleteClick(project.id);
  }


  render() {
    const { project, isInvert} = this.props;
    const startedAt = moment(project.startedAt);
    const duration = 800;
    const defaultStyle = {
      transition: `all ${duration}ms ease-in-out`,
      opacity: 0,
      'top': '50px',
    }
    const transitionStyles = {
      entering: { opacity: 1, 'top': '10px' },
      entered:  { opacity: 1, 'top': '10px' },
    };
    return (
      <li className={isInvert? 'timeline-inverted' : ''}>
        <Waypoint onPositionChange={({ previousPosition, currentPosition, event }) => {
            this.handlePositionChange(previousPosition, currentPosition) }}>
        </Waypoint>
        <div className="timeline-badge">{ startedAt.format("YYYY.MM") }</div>
        <Transition in={this.state.in} timeout={duration}>
          {(state) => (
              <div className="timeline-panel" style={{ ...defaultStyle, ...transitionStyles[state] }}>
                <div className="timeline-heading">
                  <Image src={project.icon} className="timeline-heading-img img_gene" />
                </div>
                <div className="timeline-body">
                {project.brief}
                <div className="timeline-footer">
                  <Link to={`/project/${project.id}`}>
                  more_
                  </Link>
                </div>
              </div>
            </div>
          )}
        </Transition>
      </li>
    )
  }
};
/*
<div className="timeline-controller">
	<Link to={`/project/${project.id}/edit`}>Edit_</Link>
	<Button bsStyle="link" onClick={this.handleDelete}>Delete_</Button>
</div>
*/


export default ProjectList;
