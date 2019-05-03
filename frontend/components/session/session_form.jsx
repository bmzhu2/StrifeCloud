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
    this.props.processForm(user)
      .then(() => this.props.closeModal())
      .then(() => this.props.history.push('/discover'));
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
    let emailErrText = <p></p>, usernameErrText = <p></p>, passwordErrText = <p></p>
    let emailErrField = "no-error", usernameErrField = "no-error", passwordErrField = "no-error";

    if(this.props.errors.errors) {
      this.props.errors.errors.forEach(err => {
        if (err.search("email") !== -1) {
          emailErrText = (<p className="error-text">{err}</p>)
          emailErrField = "error";
        } else if (err.search("username") !== -1) {
          usernameErrText = (<p className="error-text">{err}</p>)
          usernameErrField = "error";
        } else {
          passwordErrText = (<p className="error-text">{err}</p>)
          passwordErrField = "error";
        }
      })
    }

    debugger;

    let usernameField = undefined;
    let displayText = "Sign In"
    if(this.props.formType === "signup") {
      usernameField = (
        <label htmlFor="username">
          <input
          className={usernameErrField}
          type="text"
          value={this.state.username}
          placeholder="Your Username"
          onChange={this.updateUsername}
          />
          {usernameErrText}
        </label>
      )
      displayText = "Create account"
    }

   

    return (
      <form className="session-form">
        <label htmlFor="email">
          <input
            className={emailErrField}
            type="text"
            value={this.state.email}
            placeholder="Your Email Address"
            onChange={this.updateEmail}
          />
          {emailErrText}
        </label>
        {usernameField}
        <label htmlFor="password">
          <input
            className={passwordErrField}
            type="password"
            value={this.state.password}
            placeholder="Your Password"
            onChange={this.updatePassword}
          />
          {passwordErrText}
        </label>
        <input type="submit" value={`${displayText}`} onClick={this.handleSubmit} />
      </form>
    )
  }
}

export default SessionForm;