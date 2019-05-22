import React from 'react';
import SongBanner from './song_banner';
import SongCommentForm from './song_comment_form';
import CommentsSection from './comments_section';
import UpdateModal from './update_modal';

class SongDetail extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      deleted: false
    }

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount(){
    this.props.clearRouteErrors();
  }

  componentDidMount(){
    this.props.fetchSong(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.url !== nextProps.match.url) {
      this.props.clearRouteErrors();
      this.props.fetchSong(nextProps.match.params.id)
    }
  }

  handleDelete() {
    this.props.delete(this.props.match.params.id);
    this.setState({
      deleted: true
    })
  }

  render() {
    if (this.props.notFound || this.state.deleted) {
      return <div className="main-body"><div className="no-song">This song doesn't exist, or no longer exists.</div></div>
    }

    let song = this.props.songs[this.props.match.params.id];
    let uploader;
    let editControls = <div className="empty-song-edit-controls"></div>;
    let updateModal = null;
    let commentsSection = <CommentsSection />;
    if (song) {
      uploader = this.props.users[song.uploader_id];
      if (song.uploader_id === this.props.currentUserId) {
        editControls = (
          <div className="song-edit-controls">
            <button 
              className="edit-song"
              onClick={() => this.props.openModal('update')}><i className="fas fa-pencil-alt"></i>Edit</button>
            <button 
              className="delete-song"
              onClick={this.handleDelete}><i className="fas fa-trash"></i>Delete song</button>
          </div>
        )
      }
      if (this.props.currentUserId) {
        updateModal = <UpdateModal song={song}/>
      }
      commentsSection = <CommentsSection uploader={uploader} description={song.description}/>
    }
    let numComments = <div></div>
    if (this.props.comments) {
      
      numComments = <div className="below-banner-comment-count">
          <i className="fas fa-comment-alt"></i>
          {Object.keys(this.props.comments).length}
        </div>
    }
    
    let banner = (<div></div>)
    if(song && uploader) {
      banner = <SongBanner song={song} uploader={uploader} currentSong={this.props.currentSong} paused={this.props.paused}
        play={this.props.play} pause={this.props.pause} unpause={this.props.unpause}/>
    }
    return (
      <div className="main-body">
        {updateModal}
        {banner}
        <div className="below-banner">
          <div className="below-banner-left">
            <SongCommentForm />
            <div className="below-banner-stats">
              {editControls}
              {numComments}
            </div>
            {commentsSection}
          </div>
          <div className="below-banner-right">
            <a href="https://github.com/bmzhu2/StrifeCloud" className="github-link"></a>
          </div>
        </div>
        
      </div>
    )
  }
}

export default SongDetail;