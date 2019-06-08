import React from 'react';
import {connect} from 'react-redux';
import UserProfileBanner from './user_profile_banner';
import ProfileSongsIndex from './profile_songs_index';
import {fetchUser} from '../../actions/user_actions';
import UpdateModal from '../song/update_modal';


class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fetched: false
    }
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id)
      .then(() => this.setState({fetched: true}))
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.url !== nextProps.match.url) {
      this.props.fetchUser(nextProps.match.params.id)
    }
  }

  render() {
    let numSongs;
    if (this.props.songs) {
      numSongs = Object.keys(this.props.songs).length
    }
    let songsIndex = null;
    let emptyIndexMessage = <p>Nothing to hear</p>
    let updateModal = null
    if (this.props.currentUser.id == this.props.match.params.id) {
      updateModal = <UpdateModal />;
      emptyIndexMessage = (
        <>
          <p>Seems a little quiet over here</p>
          <button onClick={() => this.props.history.push('/upload/')}>Upload Now</button>
        </>
      )
    }

    if (numSongs === 0) {
      songsIndex = (
      <div className="empty-songs-index">
        <div className="empty-songs-index-image"></div>
        {emptyIndexMessage}
      </div>
      )
    } else {
      songsIndex = <ProfileSongsIndex fetched={this.state.fetched} />
    }

    return(
      <div className="main-body">
        <UserProfileBanner />
        <div className="below-banner-profile">
          <h2 className="below-banner-header">Songs</h2>
          <div className="below-banner-main">
            <div className="below-banner-left">
              {songsIndex}
            </div>
            <div className="below-banner-right-user-profile">
              <h3 className="user-profile-right-songs">Songs</h3>
              <div className="user-profile-right-songs-count">{numSongs}</div>
              <section className="links">
                <a href="https://github.com/bmzhu2/StrifeCloud" className="icon fab fa-github"></a>
                <a href="https://www.linkedin.com/in/brianmzhu/" className="icon fab fa-linkedin"></a>
                <a href="http://www.brianmzhu.com" className="icon fas fa-user"></a>
              </section>
            </div>
          </div> 
        </div>
        {updateModal}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  songs: state.entities.songs
})

const mapDispatchToProps = dispatch => ({
  fetchUser: id => dispatch(fetchUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);