import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import './styles/article_head.css';

const ArticleHead = (props) => {
    return (
      <Grid className="article_head_holder">
        <Row className="show-grid">
          <Col xs={12} className="">
            <h3>Article_</h3>
          </Col>
        </Row>
      </Grid>
    )
};
export default ArticleHead;
