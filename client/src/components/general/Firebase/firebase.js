import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { config } from "./config";

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.firestore();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });

  user = uid => this.db.doc(`users/${uid}`);

  users = () => this.db.collection("users");

  job = uid => this.db.doc(`jobs/${uid}`);

  jobs = () => this.db.collection("jobs");
}

export default Firebase;
