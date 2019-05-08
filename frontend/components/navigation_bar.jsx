import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../actions/modal_actions';
import { logout } from '../actions/session_actions';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props)
  
    this.userShown = false;
    this.settingsShown = false;
    this.toggleUser = this.toggleUser.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  closeMenu(e) {
    if (this.userShown) {
      this.toggleUser(e);
    }
    if (this.settingsShown) {
      this.toggleSettings(e);
    }
  }

  componentDidMount() {
    document.body.addEventListener("click", this.closeMenu);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.closeMenu);
  }

  toggleUser(e) {
    return;
  }

  toggleSettings(e) {
    if(e.currentTarget === e.target){
      e.stopPropagation();
    }
    let settingsButton = document.getElementById("settings-button");
    let settingsDropdown = document.getElementById("settings-dropdown-content");

    settingsButton.classList.toggle("clicked");
    settingsDropdown.classList.toggle("show");
    this.settingsShown = !this.settingsShown;

    if(this.userShown) {
      this.toggleUser();
    }
  }

  render() {
    let user = (<div></div>);
    let sessionButtons = (<div></div>);

    if (this.props.currentUser) {
      user = (
        <button className="user" id="user">
          <div className="profile-picture"><img src={window.placeholderProfilePic}></img></div>
          <div className="name">{this.props.currentUser.username}</div>
          <i className="fas fa-angle-down"></i>
        </button>
      )
    } else {
      sessionButtons = (
        <div className="session-buttons">
          <button className="login" onClick={() => this.props.openModal("login")}>Sign In</button>
          <button className="signup" onClick={() => this.props.openModal("signup")}>Create account</button>
        </div>
      )
    }

    return (
      <div className="full-bar">
        <nav className="navigation-bar">
          <button className="logo"
            onClick={() => this.props.history.push("/")}>
            <img src={window.logoURL} />
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
              placeholder="Search is not implemented yet"></input>
            <button className="search-submit"><i className="fas fa-search"></i></button>
          </form>
          {sessionButtons}
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
                <button className="logout"
                  onClick={() => this.props.logout().then(() => this.props.history.push("/"))}
                  > Sign out</button>
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