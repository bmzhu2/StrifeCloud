import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../actions/modal_actions';
import { logout } from '../actions/session_actions';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      query: ""
    }

    this.userShown = false;
    this.settingsShown = false;
    this.toggleUser = this.toggleUser.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  closeMenu(e) {
    if (this.userShown) {
      this.toggleUser(e);
    }
    if (this.settingsShown) {
      this.toggleSettings(e);
    }
  }

  updateSearch(e) {
    this.setState({
      query: e.target.value
    })
  }

  handleSearch() {
    if(this.state.query) {
      this.props.history.push(`/search?query=${this.state.query}`)
    }
  }

  componentDidMount() {
    document.body.addEventListener("click", this.closeMenu);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.closeMenu);
  }

  toggleUser(e) {    
    if ((e.target.parentElement.id === "user-button" || e.target.parentElement.parentElement.id ||
        e.target.id === "user-button") && e.currentTarget.classList.contains("vsc-initialized")) {
      return
    }

    if (this.props.currentUser) {
      let userButton = document.getElementById("user-button");
      let userDropdown = document.getElementById("user-dropdown-content");

      userButton.classList.toggle("clicked");
      userDropdown.classList.toggle("show");
      this.userShown = !this.userShown;

      if (this.settingsShown) {
        document.getElementById("settings-button").classList.remove("clicked");
        document.getElementById("settings-dropdown-content").classList.remove("show");
        this.settingsShown = false;
      }
    }
  }

  toggleSettings(e) {
    if ((e.target.parentElement.id === "settings-button" || e.target.id === "settings-button" ) 
      && e.currentTarget.classList.contains("vsc-initialized")) {
      return
    }

    if(this.props.currentUser) {
      let settingsButton = document.getElementById("settings-button");
      let settingsDropdown = document.getElementById("settings-dropdown-content");

      settingsButton.classList.toggle("clicked");
      settingsDropdown.classList.toggle("show");
      this.settingsShown = !this.settingsShown;

      if (this.userShown) {
        document.getElementById("user-button").classList.remove("clicked");
        document.getElementById("user-dropdown-content").classList.remove("show");
        this.userShown = false;
      }
    }
  }

  render() {
    let user = (<div></div>);
    let sessionButtons = (<div></div>);

    if (this.props.currentUser) {
      let profilePic = <div className="blank-current-user-picture"></div>
      if (this.props.currentUser.profilePictureUrl) {
        profilePic = <img className="current-user-profile-picture" src={this.props.currentUser.profilePictureUrl}></img>
      }
      user = (
        <div className="user">
          <button className="user-button" id="user-button" onClick={this.toggleUser}>
            <div className="current-user-picture-frame">{profilePic}</div>
            <div className="name">{this.props.currentUser.username}</div>
            <i className="fas fa-angle-down"></i>
          </button>
          <div className="user-dropdown-content" id="user-dropdown-content">
            <button className="to-profile"
              onClick={() => this.props.history.push(`/users/${this.props.currentUser.id}`)}
            ><i className="fas fa-user"></i>Profile</button>
          </div>
        </div>
        
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
              placeholder="Search is not implemented yet"
              onChange={this.updateSearch}></input>
            <button onClick={this.handleSearch} className="search-submit"><i className="fas fa-search"></i></button>
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
  currentUser: state.session.currentUser
})


const mapDispatchToProps = dispatch => ({
  openModal: modal => dispatch(openModal(modal)),
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);