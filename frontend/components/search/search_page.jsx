import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {search} from '../../actions/songs_actions'

class SearchPage extends React.Component {
  constructor(props) {
    super(props)
    debugger;
  }

  render() {
    return (
      <>
      </>
    )
  }
}

const mapStateToProps = state => ({
  songs: state.entities.songs
})

const mapDispatchToProps = dispatch => ({
  search: query => dispatch(search(query))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage))