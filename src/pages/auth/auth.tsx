import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppState } from "../../redux/store";
import { setUserCredential } from "../../redux/actions/auth";

const AuthPage = () => {
  const [user, isAuthLoading, error] = useAuthState(firebase.auth());
  const [displayAuthRequired, setDisplayAuthRequired] = useState(false);
  const [redirUrl, setRedirUrl] = useState("");
  const history = useHistory();
  const { credential } = useSelector((state: AppState) => ({
    ...state.authReducer,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    let fromUrl = queryString.parse(history.location.search).fromUrl;
    if (fromUrl) {
      setDisplayAuthRequired(true);
      setRedirUrl(fromUrl.toString());
    } // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(setUserCredential(user));
    if (user && redirUrl) {
      history.push(`${redirUrl}`);
    } // eslint-disable-next-line
  }, [user, dispatch]);

  const handleAuthError = (err: Error) => {
    console.log(err.message);
  };

  const AuthWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch((err) => handleAuthError(err));
  };

  const AuthWithGitHub = () => {
    const provider = new firebase.auth.GithubAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch((err) => handleAuthError(err));
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push("/");
        dispatch(setUserCredential(undefined));
      })
      .catch((err) => {
        handleAuthError(err);
      });
  };

  if (!credential)
    return (
      <div className="page auth-page">
        {displayAuthRequired && <p>Please sign in to proceed.</p>}
        <h2>Sign In / Sign Up</h2>
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
        <h4>{error}</h4>
      </div>
    );
  else
    return (
      <div className="page auth-page">
        <h2>Your Account</h2>
        <div className="auth-container">
          <img
            className="profile-img"
            alt="User profile"
            src={user?.photoURL?.toString()}
          />
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
