import React from 'react';
import {connect} from 'react-redux'
import CommentsIndexItem from './comments_index_item';

class CommentsIndex extends React.Component {

  render() {
    let comments = null;

    if(this.props.comments) {
      comments = (
        <div className="comments-index-inside">
          {Object.values(this.props.comments).reverse().map( comment => (
            <CommentsIndexItem key={comment.id} comment={comment} users={this.props.users} 
              currentUser={this.props.currentUser}/>
          ))}
        </div>
      )
    }
    return(
      <div className="comments-index">
        {comments}
        {/* <div className="comments-section-logo"></div> */}
      </div>
    )
  }
}

const dispatchStateToProps = state => ({
  users: state.entities.users,
  comments: state.entities.comments,
  currentUser: state.session.currentUser
})

export default connect(dispatchStateToProps, null)(CommentsIndex);