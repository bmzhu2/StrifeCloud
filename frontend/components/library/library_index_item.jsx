import React from 'react';
import {Link, withRouter} from 'react-router-dom';

class LibraryIndexItem extends React.Component {
  render() {
    let picture = <div className="library-empty-picture"></div>
    let title = null;
    let uploader = null;
    if(this.props.song) {
      if (this.props.song.pictureFileUrl !== "") {
        picture = <div className="library-frame" 
                    onClick={() => this.props.history.push(`/songs/${this.props.song.id}`)}>
          <img className="library-picture" src={`${this.props.song.pictureFileUrl}`} />
        </div>
      } else {
        picture = <div className="library-blank-frame"
                    onClick={() => this.props.history.push(`/songs/${this.props.song.id}`)}></div>
      }
      title = <Link className="library-item-title" to={`/songs/${this.props.song.id}`}>{this.props.song.title}</Link>
      uploader = <Link className="library-item-uploader" to={`/users/${this.props.uploader.id}`}>{this.props.uploader.username}</Link>
    }
    let display = (
      <>
        {picture}
        <div className="library-links">
          {title}
          {uploader}
        </div>
      </>
    )
    return(
      <div>{display}</div>
    )
  }
}

export default withRouter(LibraryIndexItem);