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
      debugger;
      this.props.fetchUser(nextProps.match.params.id)
    }
  }

  render() {
    return(
      <div className="main-body">
        <UserProfileBanner />
        <div className="below-banner">
          <div className="below-banner-header">
            <h2 className="profile-songs-index-header">Songs</h2>
          </div>
          <div className="below-banner-left"> 
            <ProfileSongsIndex fetched={this.state.fetched}/>
          </div>
          <div className="below-banner-right-user-page">num songs and dev info</div>
        </div>
        <UpdateModal />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUser: id => dispatch(fetchUser(id))
})

export default connect(null, mapDispatchToProps)(UserProfile);