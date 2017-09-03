import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './show.css';

const Head = (props) => {
    const createdAt = moment(props.item.createdAt);
    const updatedAt = moment(props.item.updatedAt);
    return (
      <Grid className="head_holder">
        <Row className="show-grid">
          <Col xs={12} smOffset={2} sm={8} className="">
            <h2>{props.item.title}_</h2>
            <h4>
              <span className="head_created_at"> {createdAt.format("MMM Do YYYY")}</span>
              <span className="head_updated_at"> <small>updated {updatedAt.fromNow()}</small></span>
            </h4>
          </Col>
        </Row>
      </Grid>
    )
};

export default Head;
