import React from 'react';
import Typist from 'react-typist';
import './home.scss';
import { Grid, Row, Col } from 'react-bootstrap';
import Scroll from 'react-scroll';
let ScrollLink = Scroll.Link;
import Transition from 'react-transition-group/Transition';
import Waypoint from 'react-waypoint';
import { Link } from 'react-router-dom'

class Home extends React.Component {

	constructor(props) {
    super(props);
		this.state = { active: false, };
		this.handlePositionChange = (previousPosition, currentPosition) => this._handlePositionChange(previousPosition, currentPosition);
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

	render() {
		const cursor = {
	    show: true,
	    blink: true,
	    element: '_',
	    hideWhenDone: false,
	    hideWhenDoneDelay: 1000,
	  }


		const duration = 3500;
    const leftDefaultStyle = {
			height: '50vh',
			width: '50%',
			color: '#f9f9f9',
			background: '#8E8E8E',
      transition: `all ${duration}ms ease`,
      opacity: 0,
			marginTop: '50px'
    }
		const rightDefaultStyle = {
			height: '25vh',
			width: '100%',
			background: '#F8F8F8',
      transition: `all ${duration}ms ease`,
      opacity: 0,
			marginTop: '50px'
    }
    const leftTransitionStyles = {
      entering: { opacity: 1, width: '100%'},
      entered:  { opacity: 1, width: '100%' },
    };
		const rightTransitionStyles = {
      entering: { opacity: 1, height: '50vh' },
      entered:  { opacity: 1, height: '50vh' },
    };
	  return (
	    <div className="home_holder">
	      <section className="home_introduce_holder">
	        <Grid>
	          <Row className="show-grid">
	            <Col sm={12} smOffset={0}>
	              <Typist cursor={cursor} avgTypingDelay={40} className="introduce_typist">
	                Hi<br/>
	                I am Chi Lin,<br/>
	                a Full-stack Developer<br/>
									with a passion for Human Computer Interaction<br/>
	              </Typist>
	            </Col>
	          </Row>
						<ScrollLink to="home_mid_holder" spy={true} smooth={true} offset={50} duration={500}>
							<div className='arrow_down'></div>
						</ScrollLink>
	        </Grid>
	      </section>
	      <section className="home_mid_holder" id="home_mid_holder">
	        <Grid>
	          <Row className="show-grid">
							<Waypoint onPositionChange={({ previousPosition, currentPosition, event }) => {
									this.handlePositionChange(previousPosition, currentPosition) }}>
							</Waypoint>
	            <Col sm={6} smOffset={0}>
								<Link to='/article'>
					        <Transition in={this.state.in} timeout={duration}>
					          {(state) => (
					            <div style={{ ...leftDefaultStyle, ...leftTransitionStyles[state] }}>
												<div className="home_mid_holder_intro home_mid_holder_intro_left">
													<Typist onTypingDone={this.handleTypingDone} cursor={cursor}>
													Learn<br/>
													the<br/>
													web<br/>
												  technology
													</Typist>
												</div>
					            </div>
					          )}
					        </Transition>
								</Link>
	            </Col>
							<Col sm={6} smOffset={0}>
								<Link to='/project'>
				        <Transition in={this.state.in} timeout={duration}>
				          {(state) => (
				            <div style={{ ...rightDefaultStyle, ...rightTransitionStyles[state] }}>
											<div className="home_mid_holder_intro home_mid_holder_intro_right">
												<Typist onTypingDone={this.handleTypingDone} cursor={cursor}>
												What<br/>
												I<br/>
												have<br/>
												achieved
												</Typist>
											</div>
				            </div>
				          )}
				        </Transition>
								</Link>
							</Col>
	          </Row>
	        </Grid>
	      </section>
				<Grid>
					<Row className="show-grid">
						<div className="home_footer"></div>
					</Row>
	      </Grid>
			</div>
	  );
	}
}
export default Home;
