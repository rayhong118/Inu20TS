import firebase from "firebase";

import React from "react";

const AuthPage = () => {
  const AuthWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };
  const signOut = () => {
    firebase.auth().signOut();
  };
  if (!firebase.auth().currentUser)
    return (
      <div>
        <button onClick={AuthWithGoogle}>Auth with google</button>
      </div>
    );
  else return <div>{firebase.auth().currentUser?.email}</div>;
};

export default AuthPage;
