import React from 'react';
import { connect } from 'react-redux';
import { recents } from '../../actions/user_actions';

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
    if (this.state.fetched) {
      debugger;
    }
    return (
      <>
      </>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
})

const mapDispatchToProps = dispatch => ({
  recents: userId => dispatch(recents(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentlyPlayed);