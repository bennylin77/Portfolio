import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './styles/article.css';
import Transition from 'react-transition-group/Transition';
import Waypoint from 'react-waypoint';

const ArticleList = (props) => {
    return (
      <Grid className="article_list_holder">
						<div>
            {props.articleList.map( (id, index) =>
                props.articles[id] && <ListItem {...props} key={id} article={props.articles[id]} onDeleteClick={props.onDeleteClick} />
              )
            }
						</div>
						<div className="article_list_footer"></div>
      </Grid>
    )
};

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
    const { article } = this.props;
    const createdAt = moment(article.createdAt);
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
	    <Row className="show-grid article_list_item_holder">
	      <Col xs={12} className="">
					<Waypoint onPositionChange={({ previousPosition, currentPosition, event }) => {
							this.handlePositionChange(previousPosition, currentPosition) }}>
					</Waypoint>
					<Transition in={this.state.in} timeout={duration}>
						{(state) => (
			        <Link to={`/article/${article.id}`} >
								<div style={{ ...defaultStyle, ...transitionStyles[state] }}>
				          <div className="article_list_item_title">{ article.title}</div>
				          <div>{ createdAt.format("MMM Do YYYY") }</div>
								</div>
			        </Link>
						)}
        	</Transition>
	      </Col>
	    </Row>
		)
	}
};


/*
<div className="article_list_item_control_holder">
	<Link to={`/article/${article.id}/edit`}>Edit_
	</Link>
	<Button bsStyle="link" className="article_single_delete" onClick={this.handleDelete}>
		Delete_
	</Button>
</div>
*/


export default ArticleList;
