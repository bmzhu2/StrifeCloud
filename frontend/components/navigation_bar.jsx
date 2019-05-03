import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../actions/modal_actions';
import { logout } from '../actions/session_actions';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props)

    this.toggleUser = this.toggleUser.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
  }

  toggleUser() {

  }

  toggleSettings() {
    let settingsButton = document.getElementById("settings-button");
    let settingsDropdown = document.getElementById("settings-dropdown-content");

    settingsButton.classList.toggle("clicked");
    settingsDropdown.classList.toggle("show");
  }

  render() {
    // let settingsControls = (
    //   <div></div>
    // )
    // if (this.props.currentUserId) {
    //   settingsControls = (
        
    //   )
    // }

    let user = (<div></div>);
    if (this.props.currentUser) {
      user = (
        <button className="user" id="user">
          <div className="profile-picture"></div>
          <div className="name">{this.props.currentUser.username}</div>
          <i className="fas fa-angle-down"></i>
        </button>
      )
    }

    return (
      <div className="full-bar">
        <nav className="navigation-bar">
          <button className="logo"
            onClick={() => this.props.history.push("/")}>
            <img src="./assets/logo.png" />
            StrifeCloud
          </button>
          <button className="home"
            onClick={() => this.props.history.push("/discover")}
          >Home</button>
          <button className="stream"
            onClick={() => this.props.history.push("/stream")}
          >Stream</button>
          <button className="library"
            onClick={() => this.props.history.push("/library")}
          >Library</button>
          <form className="search-bar">
            <input 
              className="search-box"
              type="text" 
              placeholder="Search"></input>
            <button className="search-submit"><i className="fas fa-search"></i></button>
          </form>
          <button className="upload"
            onClick={() => this.props.history.push("/upload")}
          >Upload</button>
          {user}
          <div className="settings">
            <button 
              className="settings-button" 
              id="settings-button"
              onClick={this.toggleSettings}
            ><i className='fas fa-ellipsis-h'></i></button>
            <div className="settings-dropdown-content" id="settings-dropdown-content">
              <button 
                className="logout" 
                onClick={() => this.props.logout().then(() => this.props.history.push("/"))}
              ><p> Sign out</p></button>
            </div>
          </div>
        </nav>
      </div>    
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.entities.users[state.session.currentUserId]
})


const mapDispatchToProps = dispatch => ({
  openModal: modal => dispatch(openModal(modal)),
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);