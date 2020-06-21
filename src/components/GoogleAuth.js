import React from 'react';

class GoogleAuth extends React.Component {
  state = {isSignedIn: null};
  componentDidMount() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: '627883123871-4r8ukas0ai9np127npfushobmapk68o8.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        // after auth2 init finish, save auth objec to this componet
        this.auth = window.gapi.auth2.getAuthInstance();
        this.setState({isSignedIn: this.auth.isSignedIn.get()});
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = () => {
    this.setState({isSignedIn: this.auth.isSignedIn.get()});
  };

  onSignIn = () => {
    this.auth.signIn();
  };

  onSignOut = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return <div> I don not know if we are signed in </div>
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignOut} className="ui red google button">
        <i className="google icon" />
          Sign out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignIn} className="ui red google button">
        <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }
  render() {
    return <div> {this.renderAuthButton()} </div>
  }
}

export default GoogleAuth;
