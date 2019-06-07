import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {searchSongs} from '../../actions/songs_actions'
import {searchUsers} from '../../actions/user_actions'

class SearchPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      option: "everything"
    }

    this.search = this.search.bind(this);
  }
  
  search(queryString) {
    // const re = /\?query=([^&]*)/;
    // const query = queryString.match(re)[1];

    this.props.searchUsers(queryString)
    this.props.searchSongs(queryString);
  }

  componentDidMount() {
    this.search(this.props.location.search)
  }

  componentDidUpdate(props) {
    // this.props.search(query)
  }

  render() {
    const re = /\?query=([^&]*)/;
    const query = this.props.location.search.match(re)[1];

    return (
      <div className="main-body">
        <div className="search-query">Search results for "{`${query}`}"</div>
        <ul className="search-options">
          <li><i className="fas fa-search"></i>Everything</li>
          <li><i className="fas fa-music"></i>Songs</li>
          <li><i className="fas fa-user"></i>People</li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  songs: state.entities.songs,
  users: state.entities.users
})

const mapDispatchToProps = dispatch => ({
  searchSongs: query => dispatch(searchSongs(query)),
  searchUsers: query => dispatch(searchUsers(query))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage))