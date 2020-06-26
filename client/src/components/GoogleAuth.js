import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: '627883123871-4r8ukas0ai9np127npfushobmapk68o8.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        // after auth2 init finish, save auth objec to this componet
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut(this.auth.currentUser.get().getId());
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
        <i className="google icon" />
          Sign out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
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
const mapStateToProps = (state) => {
  return {isSignedIn : state.auth.isSignedIn}
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);
