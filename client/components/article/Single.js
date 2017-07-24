import React from 'react';
import { Link } from 'react-router-dom'

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
      <div className="row article_single">
        <div className="col-sm-12">
          <Link to={`/article/${article.id}`}>
            {article.id}: {article.title}
          </Link>
          <Link to={`/article/${article.id}/edit`}>Edit_
          </Link>
          <button className="article_single_delete" onClick={this.handleClick}>
            Delete_
          </button>
        </div>
      </div>
    );
  }
}
export default Single;
