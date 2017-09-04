import React from 'react';
import './styles/footer.css';
import { Grid, Row, Col } from 'react-bootstrap';
import github_logo from './images/github_logo.png';
import linkedin_logo from './images/linkedin_logo.png';
import cv from './files/cv.pdf';

function Footer(props) {
  return (
		<footer className="footer_holder">
			<div  className="footer_link_holder">
				<a href="https://tw.linkedin.com/in/benny-lin-508b841a" target="_blank">
          <img src={linkedin_logo} className="footer_link_logo" />
				</a>
				<a href="https://github.com/bennylin77" target="_blank">
          <img src={github_logo} className="footer_link_logo" />
				</a>
				<a href={cv} target="_blank" className="footer_link_cv_holder">
					<div className="footer_link_cv" >CV</div>
				</a>
			</div>
      <Grid>
        <Row className="show-grid footer_contact_type_holder">
          <Col sm={12} className="">bennylin77@gmail.com</Col>
        </Row>
        <Row className="show-grid footer_contact_type_holder">
          <Col sm={12} className="">
            <strong className="footer_contact_strong"> US </strong>+1-512-9159309
            <strong className="footer_contact_strong"> TW </strong>+886-939383847
          </Col>
        </Row>
        <Row className="show-grid footer_divider_holder">
          <Col sm={12} className="">
            -
          </Col>
        </Row>
        <Row className="show-grid footer_copy_right_holder">
          <Col sm={12} className="">Copyright © Gene CHI LIN 林 起. All rights reserved. Powered by CHI LIN</Col>
        </Row>
      </Grid>
    </footer>
  );
}
export default Footer;
