import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './show.css';

import {convertFromRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import DOMPurify from 'dompurify';

const Content = (props) => {
    const content =  props.item.content? stateToHTML(convertFromRaw( JSON.parse(props.item.content))) : "no content"
    return (
      <Grid className="content_holder">
        <Row className="show-grid">
          <Col xs={12} smOffset={2} sm={8} className="" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(content) }}>
          </Col>
        </Row>
      </Grid>
    )
};
export default Content;
