import React from 'react';
import { Link } from 'react-router-dom';
import './styles/single.css';

export class Single extends React.Component {

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
export default Single;
