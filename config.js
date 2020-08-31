import * as firebase from 'firebase'
require('@firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyBBNT4sP-MpIGsz_4mFdxgbY6l52mMjoNc",
    authDomain: "storyhub-8826e.firebaseapp.com",
    databaseURL: "https://storyhub-8826e.firebaseio.com",
    projectId: "storyhub-8826e",
    storageBucket: "storyhub-8826e.appspot.com",
    messagingSenderId: "255214850128",
    appId: "1:255214850128:web:54dce20a8a2e1c0fc5c155"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();