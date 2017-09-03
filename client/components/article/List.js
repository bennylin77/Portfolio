import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './styles/article.css';

const ArticleList = (props) => {
    return (
      <Grid className="article_list_holder">
            {props.articleList.map( (id, index) =>
                props.articles[id] && <ListItem {...props} key={id} article={props.articles[id]} onDeleteClick={props.onDeleteClick} />
              )
            }
      </Grid>
    )
};

const ListItem = (props) => {
  const { article,  onDeleteClick} = props
  function handleClick(e) {
    e.preventDefault();
    onDeleteClick(article.id)
  }
  const createdAt = moment(article.createdAt);
  return (
    <Row className="show-grid article_list_item_holder">
      <Col xs={12} className="">
        <Link to={`/article/${article.id}`}>
          <div className="article_list_item_title">{ article.title}</div>
          <div>{ createdAt.format("MMM Do YYYY") }</div>
        </Link>

        <Link to={`/article/${article.id}/edit`}>Edit_
        </Link>
        <button className="article_single_delete" onClick={handleClick}>
          Delete_
        </button>
        
      </Col>
    </Row>
  )
};
/*
class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    this.props.onDeleteClick(this.props.article.id);
  }
  render() {
    const {article} = this.props;
    return (
      <Row className="show-grid">
        <Col xs={12} className="">
          <Link to={`/article/${article.id}`}>
            {article.title}
          </Link>
          <Link to={`/article/${article.id}/edit`}>Edit_
          </Link>
          <button className="article_single_delete" onClick={this.handleClick}>
            Delete_
          </button>
        </Col>
      </Row>
    );
  }
}
*/


export default ArticleList;
