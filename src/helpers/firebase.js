import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { toast } from "react-toastify";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
});

export const database = firebase.firestore();
export const storage = firebase.storage();

export const userObserver = (setCurrentUser) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const userObject = {
        email: user.email,
        displayName: user.displayName,
        uid: user.uid,
        date: user.metadata.creationTime,
      };
      setCurrentUser(userObject);
    } else {
      setCurrentUser({
        displayName: "",
        email: "",
        date: "",
        uid: "",
      });
    }
  });
};

export const register = async (userData, history) => {
  const { email, password, username } = userData;
  try {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        toast.error("Registration Failed!" + error.message);
      });
    const currentUser = firebase.auth().currentUser;
    await currentUser.updateProfile({ displayName: username });
    history.push("/");
    toast.success(
      "You have successfully registered as " + username.toUpperCase()
    );
  } catch (error) {
    toast.error("Registration failed: " + error);
  }
};

export const login = async (e, history) => {
  const { email, password } = e;
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      if (user) {
        history.push("/");
        toast.success(
          " You have successfully logged in as " +
            user.displayName.toUpperCase()
        );
      }
      // ...
    })
    .catch((error) => {
      var errorMessage = error.message;
      toast.error("Login failed: " + errorMessage);
    });
};

export const logoutFirebase = async (history) => {
  await firebase.auth().signOut();
  history.push("/");
  toast.info("You have successfully logged out");
};

export const loginGoogle = async (history) => {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });
  await firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      if (result) history.push("/");
      toast.success(
        `Welcome ${result.additionalUserInfo.profile.given_name}, you have successfully logged in.`
      );
    })
    .catch((error) => {
      toast.error("Login failed: " + error);
    });
};

export default firebase;
