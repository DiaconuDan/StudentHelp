import app from 'firebase/app';
import 'firebase/auth';
import "firebase/firestore";
import {config} from './config' ;


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

    doSignOut = () =>
         this.auth.signOut();

    doPasswordUpdate = password =>
         this.auth.currentUser.updatePassword(password);

    company = uid => this.db.collection(`companies/${uid}`);

    companies = () => this.db.collection('companies');

    user = uid => this.db.collection(`users/${uid}`);

    users = () => this.db.collection('users');


}

export default Firebase;
