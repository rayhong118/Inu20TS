import React from "react";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useStateValue } from "../../shared/tools/state";

const AuthPage = () => {
  const [user, isAuthLoading, error] = useAuthState(firebase.auth());
  const [{ theme }, dispatch] = useStateValue();

  const AuthWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  const AuthWithGitHub = () => {
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };
  const signOut = () => {
    firebase.auth().signOut();
  };

  if (!user)
    return (
      <div className="page auth-page">
        <div className="auth-container">
          <button onClick={AuthWithGoogle} className="auth-button">
            <FontAwesomeIcon icon={faGoogle} />
            Authenticate with Google
          </button>
          <button onClick={AuthWithGitHub} className="auth-button">
            <FontAwesomeIcon icon={faGithub} />
            Authenticate with GitHub
          </button>
        </div>
      </div>
    );
  else
    return (
      <div className="page auth-page">
        <div className="auth-container">
          <img className="profile-img" src="{user.photoURL}" />
          {user?.email}
          <br />
          <button className="sign-out-button" onClick={signOut}>
            Sign out
          </button>
        </div>
      </div>
    );
};

export default AuthPage;
