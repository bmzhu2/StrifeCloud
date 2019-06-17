import React from 'react';
import { connect } from 'react-redux'
import {recents} from '../../actions/user_actions'
import LibraryIndexItem from './library_index_item'

class LibraryIndex extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fetched: false
    }
  }

  componentDidMount() {
    if (this.props.category === "Recently played" && this.props.currentUser) {
      this.props.recents(this.props.currentUser.id)
        .then(() => this.setState({ fetched: true }))
    }
  }

  componentDidUpdate(prev) {
    if (this.props.category === "Recently played" && this.props.currentUser && !prev.currentUser) {
      this.props.recents(this.props.currentUser.id)
        .then(() => this.setState({ fetched: true }))
    }
  }

  render() {
    let indexItems
    if(this.props.construction) {
      indexItems = <h1 className="library-construction">This feature is under construction</h1>
    } else if (!this.props.currentUser) {
      let nums = [-1, -2, -3, -4, -5, -6]
      indexItems = nums.map(id => {
        return <LibraryIndexItem key={id} />
      })
    }

    let recents = [];
    if (this.state.fetched && this.props.currentUser) {
      let recentIds = []
      recentIds = this.props.currentUser.recently_played.split(",")
      for (let i = 0; i < 6; i++) {
        if (i < recentIds.length) {
          recents.push(recentIds[i])
        } else {
          recents.push(-i)
        }
      }
      indexItems = recents.map(id => {
        if (id < 0) {
          return <LibraryIndexItem key={id} />
        } else {
          return <LibraryIndexItem key={+id} song={this.props.songs[id]}
            uploader={this.props.users[this.props.songs[id].uploader_id]} />
        }
      })
    } 


    return(
      <div className="library-index">
        <h3>{this.props.category}</h3>
        <div className="library-index-items">
          {indexItems} 
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  users: state.entities.users,
  songs: state.entities.songs
})

const mapDispatchToProps = dispatch => ({
  recents: userId => dispatch(recents(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(LibraryIndex);