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
                <div className="timeline-controller">
                  <Link to={`/project/${project.id}/edit`}>Edit_</Link>
                  <Button bsStyle="link" onClick={this.handleDelete}>Delete_</Button>
                </div>
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
  const { project,  onDeleteClick} = props
  function handleClick(e) {
    e.preventDefault();
    onDeleteClick(project.id)
  }
  const createdAt = moment(project.createdAt);

  return (

    <Waypoint
      onEnter={this.toggleEnterState}
      onLeave={this.toggleEnterState}>
    </Waypoint>


      <Transition in={this.state.in} timeout={duration}>
        {(state) => (
          <div style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}>



          </div>
        )}
      </Transition>

      <li className={props.isInvert? 'timeline-inverted' : ''}>
        <div className="timeline-badge">2017.02</div>
        <div className="timeline-panel" id="timeline-panel_1">
          <div className="timeline-heading">
            <Image src="http://www.chi-lin.com/assets/gene_IVF-a45486924913db654e69dc09ec608cd3e5875ea7d895dd0d90051d3ad7040c56.png" className="timeline-heading-img img_gene" />
          </div>
          <div className="timeline-body">
            <ul className="timeline-ul">
              <li>Outsourcing project</li>
              <li>Official website of clinic</li>
              <li>Appointment system</li>
              <li>Google virtual tour</li>
              <li>Responsive web design</li>
            </ul>
            <div className="timeline-split">-</div>
          </div>
          <div className="timeline-footer">
            <a href="http://www.geneivf.com/" target="_blank">enter<span className="bblink">_</span></a>
          </div>
        </div>
      </li>






  )
};
*/


export default ProjectList;


/*
        return (
          <div style={{'padding-top': '1000px', 'padding-bottom': '1000px'}}>
            <Waypoint
              onEnter={this.toggleEnterState}
              onLeave={this.toggleEnterState}>
              <div style={{ background: 'yellow', width: '100%'}}></div>
            </Waypoint>
              <Transition in={this.state.in} timeout={duration}>
                {(state) => (
                  <div style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                  }}>
                    I'm A fade Transition!
                  </div>
                )}
              </Transition>
              <button onClick={this.toggleEnterState}>Click to Enter</button>
          </div>
        );
      }
*/

/*
<Row className="show-grid project_list_item_holder">
  <Col xs={12} className="">
    <Link to={`/project/${project.id}`}>
      <div className="project_list_item_title">{ project.title}</div>
      <div>{ createdAt.format("MMM Do YYYY") }</div>
    </Link>
    <Link to={`/project/${project.id}/edit`}>Edit_
    </Link>
    <button className="project_single_delete" onClick={handleClick}>
      Delete_
    </button>
  </Col>
</Row>




<section style="position: relative;" id="timeline_outter_holder">
  <div class="container" style="padding-top: 40px;">
      <ul class="timeline">
          <li>
            <div class="timeline-badge">2017.02</div>
            <div class="timeline-panel" id="timeline-panel_1">
              <div class="timeline-heading">
                <%=image_tag 'gene_IVF.png', class: "timeline-heading-img img_gene"%>
              </div>
              <div class="timeline-body">
                <ul class="timeline-ul">
                  <li>Outsourcing project</li>
                  <li>Official website of clinic</li>
                  <li>Appointment system</li>
                  <li>Google virtual tour</li>
                  <li>Responsive web design</li>
                </ul>
                <div class="timeline-split">-</div>
              </div>
              <div class="timeline-footer">
                <a href="http://www.geneivf.com/" target="_blank">enter<span class="bblink">_</span></a>
              </div>
            </div>
          </li>
          <li class="timeline-inverted">
            <div class="timeline-badge">2016.06</div>
            <div class="timeline-panel" id="timeline-panel_2">
              <div class="timeline-heading">
                <%=image_tag 'spring_foundation.png', class: "timeline-heading-img img_spring"%>
              </div>
              <div class="timeline-body">
                <ul class="timeline-ul">
                  <li>Outsourcing project</li>
                  <li>Official website of college foundation</li>
                  <li>Donation system</li>
                  <li>Payment system</li>
                  <li>Project management system</li>
                  <li>Responsive web design</li>
                </ul>
                <div class="timeline-split">-</div>
              </div>
              <div class="timeline-footer">
                <a href="https://www.spring.org.tw" target="_blank">enter<span class="bblink">_</span></a>
              </div>
            </div>
          </li>
      </ul>
  </div>
</section>
*/
