import React from "react";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";

const AuthPage = () => {
  const [user, isAuthLoading, error] = useAuthState(firebase.auth());
  const AuthWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };
  const signOut = () => {
    firebase.auth().signOut();
  };

  if (!user)
    return (
      <div>
        <button onClick={AuthWithGoogle}>Auth with google</button>
      </div>
    );
  else
    return (
      <div>
        {user?.email}
        <br />
        <button onClick={signOut}>Sign out</button>
      </div>
    );
};

export default AuthPage;
