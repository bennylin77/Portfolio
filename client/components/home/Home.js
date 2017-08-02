import React from 'react';
import Typist from 'react-typist';
import './home.css';
import { Grid, Row, Col } from 'react-bootstrap';

function Home(props) {
  const cursor = {
    show: true,
    blink: true,
    element: '_',
    hideWhenDone: false,
    hideWhenDoneDelay: 1000,
  }

  return (
    <div className="home_holder">
      <section className="home_introduce_holder">
        <Grid fluid>
          <Row className="show-grid">
            <Col sm={11} smOffset={1}>
              <Typist cursor={cursor} className="introduce_typist">
                Hi<br/>
                I am Chi Lin,<br/>
                an UX designer,<br/>
                a full-stack developer<br/>
                and a serial entrepreneur
              </Typist>
            </Col>
          </Row>
        </Grid>
      </section>
      <section className="home_mid_holder">
        <Grid fluid>
          <Row className="show-grid">
            <Col sm={11} smOffset={1}>
              <Typist cursor={cursor} className="introduce_typist">
                This site is a single page website<br/>
                composed by<br/>
                React + Redux + Bootstrap + Express + MongoDB<br/>
              </Typist>
            </Col>
          </Row>
        </Grid>
      </section>
    </div>
  );
}
export default Home;
