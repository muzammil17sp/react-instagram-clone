import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyARWMp9DfOaDnV5eYxtdPF5nRLovIVnyL0",
  authDomain: "instagram-a6b0c.firebaseapp.com",
  projectId: "instagram-a6b0c",
  storageBucket: "instagram-a6b0c.appspot.com",
  messagingSenderId: "320651012765",
  appId: "1:320651012765:web:7f2c69a544cb55b8ae4274",
  measurementId: "G-XHM6JYLRJG",
});
const firestore = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { firestore, auth, storage };
