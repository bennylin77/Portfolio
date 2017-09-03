import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import './styles/project.css';

const ProjectHead = (props) => {
    return (
      <Grid className="project_head_holder">
        <Row className="show-grid">
          <Col xs={12} className="">
            <h2>Projects_</h2>
          </Col>
        </Row>
      </Grid>
    )
};
export default ProjectHead;
