import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD1pISHV6sAUcqPx4dSv0MfgfHyJuh8q3k",
  authDomain: "shopping-cart-c8fac.firebaseapp.com",
  projectId: "shopping-cart-c8fac",
  storageBucket: "shopping-cart-c8fac.appspot.com",
  messagingSenderId: "50133824625",
  appId: "1:50133824625:web:4c3287d8aac37f5bd857d0",
};

// Init firebase
firebase.initializeApp(firebaseConfig);

// init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timeStamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
