import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {searchSongs} from '../../actions/songs_actions'
import {searchUsers} from '../../actions/user_actions'
import SearchResults from './search_results'

class SearchPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      option: "everything",
      searched: false
    }

    this.search = this.search.bind(this);
    this.setOption = this.setOption.bind(this);
  }
  
  search(queryString) {
    this.props.searchUsers(queryString)
      .then(() => this.props.searchSongs(queryString))
      .then(() => this.setState({
        searched: true
      }))
      
  }

  setOption(option) {
    this.setState({
      option
    })
  }

  componentDidMount() {
    this.search(this.props.location.search)
  }

  componentDidUpdate(prevProps) {
    if(this.props.location.search !== prevProps.location.search) {
      this.search(this.props.location.search)
    }
  }

  render() {
    const re = /\?query=([^&]*)/;
    const query = this.props.location.search.match(re)[1].split('%20').join(' ');

    let everything = <li onClick={() => this.setOption("everything")}><i className="fas fa-search"></i>Everything</li>
    let songs = <li onClick={() => this.setOption("songs")}><i className="fas fa-music"></i>Songs</li>
    let users = <li onClick={() => this.setOption("users")}><i className="fas fa-user"></i>People</li>

    if (this.state.option === "everything") {
      everything = <li onClick={() => this.setOption("everything")} className="selected">
                    <i className="fas fa-search"></i>
                   Everything</li>
    } else if (this.state.option === "songs") {
      songs = <li onClick={() => this.setOption("songs")} className="selected">
                <i className="fas fa-music"></i>
              Songs</li>
    } else if (this.state.option === "users") {
      users = <li onClick={() => this.setOption("users")} className="selected">
                <i className="fas fa-user"></i>
              People</li>
    }

    return (
      <div className="main-body">
        <div className="search-query">Search results for "{`${query}`}"</div>
        <ul className="search-options">
          {everything}
          {songs}
          {users}
        </ul>
        <SearchResults query={query} option={this.state.option} searched={this.state.searched}
          songs={this.props.songs} users={this.props.users} searchedUsers={this.props.searchedUsers}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  songs: state.entities.songs,
  users: state.entities.users,
  searchedUsers: state.entities.searchedUsers
})

const mapDispatchToProps = dispatch => ({
  searchSongs: query => dispatch(searchSongs(query)),
  searchUsers: query => dispatch(searchUsers(query))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage))