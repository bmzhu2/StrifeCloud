import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { recents } from '../../actions/user_actions';
import RecentlyPlayedItem from './recently_played_item.jsx';

class RecentlyPlayed extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fetched: false
    }
  }

  componentDidMount() {
    if(this.props.currentUser) {
      this.props.recents(this.props.currentUser.id)
        .then(() => this.setState({fetched: true}))
    }
  }

  render() {
    let recentItems = null;
    if (this.state.fetched) {
      const recentIds = this.props.currentUser.recently_played.split(",")
      recentItems = recentIds.map(id => {
        return <RecentlyPlayedItem key={id} song={this.props.songs[id]} 
                uploader={this.props.users[this.props.songs[id].uploader_id]} />
      })
    }
    return (

      <div className="discover-recents">
        <Link to="/library" className="discover-recents-link">Listening history</Link>
        {recentItems}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.entities.users,
  songs: state.entities.songs,
  currentUser: state.session.currentUser
})

const mapDispatchToProps = dispatch => ({
  recents: userId => dispatch(recents(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentlyPlayed);