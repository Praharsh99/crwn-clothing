import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDvOWQkuq9SqPlfEUfY8YybhZB_BQLYt9g",
  authDomain: "crwn-db-57378.firebaseapp.com",
  databaseURL: "https://crwn-db-57378.firebaseio.com",
  projectId: "crwn-db-57378",
  storageBucket: "crwn-db-57378.appspot.com",
  messagingSenderId: "1040437507881",
  appId: "1:1040437507881:web:75f270fdb098ad911fa938",
  measurementId: "G-2SVVEE7FW5",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log("Error creating user", err.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
