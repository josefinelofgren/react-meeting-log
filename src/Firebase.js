import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA8nQXVF-s2ixf0QThEhAgnr_itH4CeVvc",
    authDomain: "react-app-6106a.firebaseapp.com",
    databaseURL: "https://react-app-6106a-default-rtdb.firebaseio.com",
    projectId: "react-app-6106a",
    storageBucket: "react-app-6106a.appspot.com",
    messagingSenderId: "929016927762",
    appId: "1:929016927762:web:bd944254d0998a634d2acb",
    measurementId: "G-XVGVPN0D0M"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();

  export default firebase;