import React from 'react';

class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, {user: this.state});
    this.props.processForm(user);
    this.props.closeModal();
  }

  updateEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  updateUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  updatePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  render() {
    let usernameField = undefined;
    let displayText = "Sign In"
    if(this.props.formType === "signup") {
      usernameField = (
        <label htmlFor="username">
            <input
            type="text"
            value={this.state.username}
            placeholder="Your Username"
            onChange={this.updateUsername}
          />
        </label>
      )
      buttonText = "Create account"
    }
    return (
      <form className="session-form">
        <label htmlFor="email">
          <input
            type="text"
            value={this.state.email}
            placeholder="Your Email Address"
            onChange={this.updateEmail}
          />
        </label>
        {usernameField}
        <label htmlFor="password">
          <input
            type="password"
            value={this.state.password}
            placeholder="Your Password"
            onChange={this.updatePassword}
          />
        </label>
        <input type="submit" value={`${displayText}`} onClick={this.handleSubmit} />
      </form>
    )
  }
}

export default SessionForm;