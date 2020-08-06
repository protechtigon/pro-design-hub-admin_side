import firebase from 'firebase'
import firestore from 'firebase/firestore'

const settings = { timestampsInSnapshots: true };

var firebaseConfig = {
    apiKey: "AIzaSyARYnbkCLb_dr6z2Tun8dsYUBCQgOLJfQc",
    authDomain: "prohub-estore.firebaseapp.com",
    databaseURL: "https://prohub-estore.firebaseio.com",
    projectId: "prohub-estore",
    storageBucket: "prohub-estore.appspot.com",
    messagingSenderId: "592963289170",
    appId: "1:592963289170:web:21d3bee4f3ce49d9741f8b",
    measurementId: "G-4CDQG43BC6"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const storage = firebaseApp.storage();

  // firebase.firestore()
  export { db, storage };
  // export default firebase;